import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ChatRequest {
  unitId: string;
  userMessage: string;
  conversationHistory: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  agentName?: string;
  agentPrompt?: string;
  unitTitle?: string;
}

interface ChatResponse {
  message: string;
  analysis: {
    grammar_errors: string[];
    vocabulary_suggestions: string[];
    fluency_score: number;
    confidence_level: 'low' | 'medium' | 'high';
  };
  suggestions: string[];
  conversationComplete: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { unitId, userMessage, conversationHistory, agentName, agentPrompt, unitTitle }: ChatRequest = await req.json()

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Build the conversation context
    const systemPrompt = `Eres ${agentName || 'un tutor de español'}, un profesor de idiomas amigable y paciente. 

CONTEXTO DE LA LECCIÓN: ${unitTitle || 'Conversación general'}
INSTRUCCIONES ESPECÍFICAS: ${agentPrompt || 'Ayuda al estudiante a practicar español de forma natural y conversacional.'}

REGLAS IMPORTANTES:
1. Responde SIEMPRE en español, sin importar el idioma del estudiante
2. Mantén un tono amigable, paciente y alentador
3. Corrige errores de forma sutil y constructiva
4. Haz preguntas de seguimiento para mantener la conversación fluida
5. Adapta tu nivel de español al nivel del estudiante
6. Si el estudiante comete errores, corrígelos de forma natural en tu respuesta
7. Mantén las respuestas entre 1-3 oraciones para facilitar la comprensión
8. Usa vocabulario apropiado para el contexto de la lección

ANÁLISIS REQUERIDO:
- Identifica errores gramaticales en el mensaje del estudiante
- Sugiere mejoras de vocabulario
- Evalúa la fluidez (0-100)
- Determina el nivel de confianza del estudiante

La conversación debe sentirse natural y educativa. ¡Sé un gran profesor!`

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ]

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using the latest efficient model
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        functions: [
          {
            name: 'analyze_student_response',
            description: 'Analyze the student\'s Spanish response for errors and improvements',
            parameters: {
              type: 'object',
              properties: {
                grammar_errors: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of grammar errors found'
                },
                vocabulary_suggestions: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Vocabulary improvement suggestions'
                },
                fluency_score: {
                  type: 'number',
                  minimum: 0,
                  maximum: 100,
                  description: 'Fluency score from 0-100'
                },
                confidence_level: {
                  type: 'string',
                  enum: ['low', 'medium', 'high'],
                  description: 'Student confidence level assessment'
                },
                teaching_suggestions: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Specific teaching suggestions for the student'
                }
              },
              required: ['grammar_errors', 'vocabulary_suggestions', 'fluency_score', 'confidence_level', 'teaching_suggestions']
            }
          }
        ],
        function_call: 'auto'
    }),
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const openaiData = await openaiResponse.json()
    const assistantMessage = openaiData.choices[0].message.content
    const functionCall = openaiData.choices[0].message.function_call

    // Parse analysis from function call if available
    let analysis = {
      grammar_errors: [],
      vocabulary_suggestions: [],
      fluency_score: 75,
      confidence_level: 'medium' as const
    }

    let suggestions: string[] = []

    if (functionCall && functionCall.name === 'analyze_student_response') {
      try {
        const analysisData = JSON.parse(functionCall.arguments)
        analysis = {
          grammar_errors: analysisData.grammar_errors || [],
          vocabulary_suggestions: analysisData.vocabulary_suggestions || [],
          fluency_score: analysisData.fluency_score || 75,
          confidence_level: analysisData.confidence_level || 'medium'
        }
        suggestions = analysisData.teaching_suggestions || []
      } catch (e) {
        console.error('Error parsing function call:', e)
      }
    }

    // Determine if conversation should end (after 8-10 exchanges)
    const conversationComplete = conversationHistory.length >= 16 // 8 exchanges (user + assistant each)

    const response: ChatResponse = {
      message: assistantMessage || '¡Excelente! Sigamos practicando. ¿Qué más te gustaría conversar?',
      analysis,
      suggestions,
      conversationComplete
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in chat-ai function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Error processing chat request',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})