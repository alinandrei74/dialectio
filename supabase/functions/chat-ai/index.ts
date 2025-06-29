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
  targetLanguage?: string; // NEW: Target language for the conversation
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
    const { 
      unitId, 
      userMessage, 
      conversationHistory, 
      agentName, 
      agentPrompt, 
      unitTitle,
      targetLanguage = 'es' // Default to Spanish if not provided
    }: ChatRequest = await req.json()

    console.log(`🤖 Chat AI request - Unit: ${unitTitle}, Target Language: ${targetLanguage}`)

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Get language-specific system prompts
    const getLanguagePrompt = (lang: string) => {
      switch (lang) {
        case 'it':
          return `Sei ${agentName || 'un tutor di italiano'}, un insegnante di lingue amichevole e paziente.

CONTESTO DELLA LEZIONE: ${unitTitle || 'Conversazione generale'}
ISTRUZIONI SPECIFICHE: ${agentPrompt || 'Aiuta lo studente a praticare l\'italiano in modo naturale e conversazionale.'}

REGOLE IMPORTANTI:
1. Rispondi SEMPRE in italiano, indipendentemente dalla lingua dello studente
2. Mantieni un tono amichevole, paziente e incoraggiante
3. Correggi gli errori in modo sottile e costruttivo
4. Fai domande di follow-up per mantenere la conversazione fluida
5. Adatta il tuo livello di italiano al livello dello studente
6. Se lo studente commette errori, correggili in modo naturale nella tua risposta
7. Mantieni le risposte tra 1-3 frasi per facilitare la comprensione
8. Usa un vocabolario appropriato per il contesto della lezione

ANALISI RICHIESTA:
- Identifica errori grammaticali nel messaggio dello studente
- Suggerisci miglioramenti del vocabolario
- Valuta la fluidez (0-100)
- Determina il livello di confidenza dello studente

La conversazione deve sembrare naturale ed educativa. Sii un grande insegnante!`;

        case 'fr':
          return `Vous êtes ${agentName || 'un tuteur de français'}, un professeur de langues amical et patient.

CONTEXTE DE LA LEÇON: ${unitTitle || 'Conversation générale'}
INSTRUCTIONS SPÉCIFIQUES: ${agentPrompt || 'Aidez l\'étudiant à pratiquer le français de manière naturelle et conversationnelle.'}

RÈGLES IMPORTANTES:
1. Répondez TOUJOURS en français, quelle que soit la langue de l'étudiant
2. Maintenez un ton amical, patient et encourageant
3. Corrigez les erreurs de manière subtile et constructive
4. Posez des questions de suivi pour maintenir la conversation fluide
5. Adaptez votre niveau de français au niveau de l'étudiant
6. Si l'étudiant fait des erreurs, corrigez-les naturellement dans votre réponse
7. Gardez les réponses entre 1-3 phrases pour faciliter la compréhension
8. Utilisez un vocabulaire approprié pour le contexte de la leçon

ANALYSE REQUISE:
- Identifiez les erreurs grammaticales dans le message de l'étudiant
- Suggérez des améliorations de vocabulaire
- Évaluez la fluidité (0-100)
- Déterminez le niveau de confiance de l'étudiant

La conversation doit sembler naturelle et éducative. Soyez un excellent professeur!`;

        case 'pt':
          return `Você é ${agentName || 'um tutor de português'}, um professor de idiomas amigável e paciente.

CONTEXTO DA LIÇÃO: ${unitTitle || 'Conversa geral'}
INSTRUÇÕES ESPECÍFICAS: ${agentPrompt || 'Ajude o estudante a praticar português de forma natural e conversacional.'}

REGRAS IMPORTANTES:
1. Responda SEMPRE em português, independentemente do idioma do estudante
2. Mantenha um tom amigável, paciente e encorajador
3. Corrija erros de forma sutil e construtiva
4. Faça perguntas de acompanhamento para manter a conversa fluida
5. Adapte seu nível de português ao nível do estudante
6. Se o estudante cometer erros, corrija-os naturalmente em sua resposta
7. Mantenha as respostas entre 1-3 frases para facilitar a compreensão
8. Use vocabulário apropriado para o contexto da lição

ANÁLISE NECESSÁRIA:
- Identifique erros gramaticais na mensagem do estudante
- Sugira melhorias de vocabulário
- Avalie a fluência (0-100)
- Determine o nível de confiança do estudante

A conversa deve parecer natural e educativa. Seja um ótimo professor!`;

        case 'en':
          return `You are ${agentName || 'an English tutor'}, a friendly and patient language teacher.

LESSON CONTEXT: ${unitTitle || 'General conversation'}
SPECIFIC INSTRUCTIONS: ${agentPrompt || 'Help the student practice English in a natural and conversational way.'}

IMPORTANT RULES:
1. ALWAYS respond in English, regardless of the student's language
2. Maintain a friendly, patient, and encouraging tone
3. Correct errors subtly and constructively
4. Ask follow-up questions to keep the conversation flowing
5. Adapt your English level to the student's level
6. If the student makes errors, correct them naturally in your response
7. Keep responses between 1-3 sentences for easy comprehension
8. Use vocabulary appropriate for the lesson context

REQUIRED ANALYSIS:
- Identify grammatical errors in the student's message
- Suggest vocabulary improvements
- Evaluate fluency (0-100)
- Determine the student's confidence level

The conversation should feel natural and educational. Be a great teacher!`;

        case 'es':
        default:
          return `Eres ${agentName || 'un tutor de español'}, un profesor de idiomas amigable y paciente. 

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

La conversación debe sentirse natural y educativa. ¡Sé un gran profesor!`;
      }
    };

    const systemPrompt = getLanguagePrompt(targetLanguage);

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
        model: 'gpt-4o-mini', // Using the latest efficient model (cheapest option)
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        functions: [
          {
            name: 'analyze_student_response',
            description: 'Analyze the student\'s language response for errors and improvements',
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

    // Get default response based on language
    const getDefaultResponse = (lang: string) => {
      switch (lang) {
        case 'it':
          return '¡Eccellente! Continuiamo a praticare. Di cosa altro ti piacerebbe parlare?';
        case 'fr':
          return '¡Excellent! Continuons à pratiquer. De quoi d\'autre aimeriez-vous parler?';
        case 'pt':
          return '¡Excelente! Vamos continuar praticando. Sobre o que mais você gostaria de conversar?';
        case 'en':
          return '¡Excellent! Let\'s keep practicing. What else would you like to talk about?';
        case 'es':
        default:
          return '¡Excelente! Sigamos practicando. ¿Qué más te gustaría conversar?';
      }
    };

    const response: ChatResponse = {
      message: assistantMessage || getDefaultResponse(targetLanguage),
      analysis,
      suggestions,
      conversationComplete
    }

    console.log(`✅ Chat AI response generated for ${targetLanguage}`)

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