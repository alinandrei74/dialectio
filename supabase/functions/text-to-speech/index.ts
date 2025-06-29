import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface TTSRequest {
  text: string;
  voice?: string;
  language?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text, voice = 'Bella', language = 'es' }: TTSRequest = await req.json()

    // Get ElevenLabs API key from environment
    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    if (!elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    // Voice ID mapping for different languages and styles
    const voiceIds: Record<string, string> = {
      // Spanish voices
      'Bella': 'EXAVITQu4vr4xnSDxMaL', // Bella - Young, friendly female
      'Diego': 'DuNNuLlqzBaG5mX1mVdx', // Diego - Mature, warm male
      'Valentina': 'FGY2WhTYpPnrIDTdsKH5', // Valentina - Professional female
      'Carlos': 'IKne3meq5aSn9XLyUdCD', // Carlos - Energetic male
      
      // French voices (for future expansion)
      'Antoine': 'ErXwobaYiN019PkySvjV', // Antoine - French male
      'Charlotte': 'XB0fDUnXU5powFXDhCwa', // Charlotte - French female
      
      // Italian voices (for future expansion)
      'Giovanni': 'zcAOhNBS3c14rBihAFp1', // Giovanni - Italian male
      'Giulia': 'jsCqWAovK2LkecY7zXl4', // Giulia - Italian female
      
      // Portuguese voices (for future expansion)
      'Ricardo': 'onwK4e9ZLuTAKqWW03F9', // Ricardo - Portuguese male
      'Camila': 'XrExE9yKIg1WjnnlVkGX', // Camila - Portuguese female
    }

    // Select appropriate voice based on language and preference
    let selectedVoiceId = voiceIds[voice] || voiceIds['Bella']

    // Auto-select voice based on language if not specified
    if (voice === 'auto') {
      switch (language) {
        case 'es':
          selectedVoiceId = voiceIds['Bella']
          break
        case 'fr':
          selectedVoiceId = voiceIds['Charlotte']
          break
        case 'it':
          selectedVoiceId = voiceIds['Giulia']
          break
        case 'pt':
          selectedVoiceId = voiceIds['Camila']
          break
        default:
          selectedVoiceId = voiceIds['Bella']
      }
    }

    // Call ElevenLabs API
    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2', // Best model for multiple languages
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        }),
      }
    )

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text()
      console.error('ElevenLabs API error:', errorText)
      throw new Error(`ElevenLabs API error: ${elevenLabsResponse.status}`)
    }

    // Get the audio data
    const audioData = await elevenLabsResponse.arrayBuffer()

    // Return the audio file
    return new Response(audioData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.byteLength.toString(),
      },
    })

  } catch (error) {
    console.error('Error in text-to-speech function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Error generating speech',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})