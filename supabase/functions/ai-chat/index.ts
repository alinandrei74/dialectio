import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ChatRequest {
  message: string;
  unitTitle: string;
  agentName: string;
  agentPrompt?: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  targetLanguage: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface ChatResponse {
  message: string;
  analysis: {
    grammar_errors: string[];
    vocabulary_suggestions: string[];
    pronunciation_tips: string[];
    fluency_score: number;
  };
  suggestions: string[];
  audioUrl?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, unitTitle, agentName, agentPrompt, conversationHistory, targetLanguage, userLevel }: ChatRequest = await req.json()

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Build the system prompt for the AI tutor
    const systemPrompt = `Eres ${agentName}, un tutor de ${targetLanguage} especializado en conversaciones prácticas. 

CONTEXTO DE LA LECCIÓN: ${unitTitle}
${agentPrompt ? `INSTRUCCIONES ESPECÍFICAS: ${agentPrompt}` : ''}

NIVEL DEL ESTUDIANTE: ${userLevel}

INSTRUCCIONES:
1. Responde SIEMPRE en ${targetLanguage}
2. Adapta tu nivel de vocabulario y gramática al nivel del estudiante
3. Sé paciente, alentador y constructivo
4. Corrige errores de manera sutil y educativa
5. Haz preguntas de seguimiento para mantener la conversación
6. Usa un tono natural y conversacional
7. Si el estudiante comete errores, incorpóralos naturalmente en tu respuesta mostrando la forma correcta

ANÁLISIS REQUERIDO:
- Identifica errores gramaticales en el mensaje del estudiante
- Sugiere mejoras de vocabulario
- Proporciona consejos de pronunciación si es relevante
- Evalúa la fluidez del estudiante (0-100)

Responde de manera natural y educativa, manteniendo la conversación fluida.`

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        functions: [
          {
            name: 'analyze_student_response',
            description: 'Analyze the student\'s response for learning feedback',
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
                pronunciation_tips: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Pronunciation tips'
                },
                fluency_score: {
                  type: 'number',
                  description: 'Fluency score from 0 to 100'
                },
                suggestions: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'General learning suggestions'
                }
              },
              required: ['grammar_errors', 'vocabulary_suggestions', 'pronunciation_tips', 'fluency_score', 'suggestions']
            }
          }
        ],
        function_call: 'auto'
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const openaiData = await openaiResponse.json()
    const aiMessage = openaiData.choices[0].message.content
    
    // Extract analysis from function call if available
    let analysis = {
      grammar_errors: [],
      vocabulary_suggestions: [],
      pronunciation_tips: [],
      fluency_score: 75
    }
    let suggestions: string[] = []

    if (openaiData.choices[0].message.function_call) {
      try {
        const functionArgs = JSON.parse(openaiData.choices[0].message.function_call.arguments)
        analysis = {
          grammar_errors: functionArgs.grammar_errors || [],
          vocabulary_suggestions: functionArgs.vocabulary_suggestions || [],
          pronunciation_tips: functionArgs.pronunciation_tips || [],
          fluency_score: functionArgs.fluency_score || 75
        }
        suggestions = functionArgs.suggestions || []
      } catch (e) {
        console.error('Error parsing function call:', e)
      }
    }

    // Generate audio with ElevenLabs
    let audioUrl: string | undefined

    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    const voiceId = Deno.env.get('ELEVENLABS_VOICE_ID')

    if (elevenlabsApiKey && voiceId) {
      try {
        const audioResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': elevenlabsApiKey,
          },
          body: JSON.stringify({
            text: aiMessage,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
              style: 0.0,
              use_speaker_boost: true
            }
          }),
        })

        if (audioResponse.ok) {
          const audioBuffer = await audioResponse.arrayBuffer()
          const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)))
          audioUrl = `data:audio/mpeg;base64,${audioBase64}`
        }
      } catch (audioError) {
        console.error('ElevenLabs audio generation error:', audioError)
        // Continue without audio if there's an error
      }
    }

    const response: ChatResponse = {
      message: aiMessage,
      analysis,
      suggestions,
      audioUrl
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in ai-chat function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: 'Lo siento, ha ocurrido un error. ¿Podrías intentar de nuevo?',
        analysis: {
          grammar_errors: [],
          vocabulary_suggestions: [],
          pronunciation_tips: [],
          fluency_score: 0
        },
        suggestions: []
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})