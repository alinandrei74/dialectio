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
    const { text, voice = 'auto', language = 'es' }: TTSRequest = await req.json()

    // Validate input
    if (!text || text.trim().length === 0) {
      throw new Error('Text is required for speech synthesis')
    }

    console.log(`🔊 TTS Request - Text: "${text.substring(0, 100)}...", Voice: ${voice}, Language: ${language}`)

    // Get ElevenLabs API key from environment
    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    if (!elevenLabsApiKey) {
      console.error('❌ ElevenLabs API key not configured')
      return new Response(
        JSON.stringify({ 
          error: 'Text-to-speech service not configured',
          details: 'API key missing'
        }),
        { 
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('✅ ElevenLabs API key found')

    // Voice ID mapping for different languages - USING CHEAPEST VOICES
    // Note: These are the most cost-effective voices available in ElevenLabs
    const voiceIds: Record<string, string> = {
      // Spanish voices (cheapest options)
      'Bella': 'EXAVITQu4vr4xnSDxMaL', // Bella - Most cost-effective Spanish female
      'Diego': 'DuNNuLlqzBaG5mX1mVdx', // Diego - Most cost-effective Spanish male
      
      // French voices (cheapest options)
      'Charlotte': 'XB0fDUnXU5powFXDhCwa', // Charlotte - Most cost-effective French female
      'Antoine': 'ErXwobaYiN019PkySvjV', // Antoine - Most cost-effective French male
      
      // Italian voices (cheapest options)
      'Giulia': 'jsCqWAovK2LkecY7zXl4', // Giulia - Most cost-effective Italian female
      'Giovanni': 'zcAOhNBS3c14rBihAFp1', // Giovanni - Most cost-effective Italian male
      
      // Portuguese voices (cheapest options)
      'Camila': 'XrExE9yKIg1WjnnlVkGX', // Camila - Most cost-effective Portuguese female
      'Ricardo': 'onwK4e9ZLuTAKqWW03F9', // Ricardo - Most cost-effective Portuguese male
      
      // English voices (cheapest options)
      'Sarah': 'EXAVITQu4vr4xnSDxMaL', // Sarah - Most cost-effective English female
      'Michael': 'flq6f7yk4E4fJM5XTYuZ', // Michael - Most cost-effective English male
    }

    // Select the cheapest voice based on language
    let selectedVoiceId: string;

    if (voice === 'auto') {
      // Auto-select the cheapest voice for each language
      switch (language) {
        case 'es':
          selectedVoiceId = voiceIds['Bella']; // Cheapest Spanish voice
          console.log('🇪🇸 Using cheapest Spanish voice: Bella');
          break;
        case 'fr':
          selectedVoiceId = voiceIds['Charlotte']; // Cheapest French voice
          console.log('🇫🇷 Using cheapest French voice: Charlotte');
          break;
        case 'it':
          selectedVoiceId = voiceIds['Giulia']; // Cheapest Italian voice
          console.log('🇮🇹 Using cheapest Italian voice: Giulia');
          break;
        case 'pt':
          selectedVoiceId = voiceIds['Camila']; // Cheapest Portuguese voice
          console.log('🇵🇹 Using cheapest Portuguese voice: Camila');
          break;
        case 'en':
          selectedVoiceId = voiceIds['Sarah']; // Cheapest English voice
          console.log('🇺🇸 Using cheapest English voice: Sarah');
          break;
        default:
          selectedVoiceId = voiceIds['Bella']; // Default to cheapest Spanish voice
          console.log('🌐 Using default cheapest voice: Bella');
      }
    } else {
      // Use specified voice or fallback to cheapest
      selectedVoiceId = voiceIds[voice] || voiceIds['Bella'];
      console.log(`🎤 Using specified voice: ${voice} (ID: ${selectedVoiceId})`);
    }

    console.log(`💰 Selected voice ID: ${selectedVoiceId} (optimized for cost)`);

    // Call ElevenLabs API with cost-optimized settings
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
          model_id: 'eleven_turbo_v2', // Fastest and cheapest model
          voice_settings: {
            stability: 0.5, // Balanced for cost and quality
            similarity_boost: 0.5, // Lower for cost optimization
            style: 0.0, // Minimal style for cost efficiency
            use_speaker_boost: false // Disabled for cost optimization
          }
        }),
      }
    )

    console.log(`📡 ElevenLabs API response: ${elevenLabsResponse.status} ${elevenLabsResponse.statusText}`)

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text()
      console.error('❌ ElevenLabs API error:', {
        status: elevenLabsResponse.status,
        statusText: elevenLabsResponse.statusText,
        error: errorText
      })

      // Handle specific error cases
      if (elevenLabsResponse.status === 401) {
        return new Response(
          JSON.stringify({ 
            error: 'Text-to-speech authentication failed',
            details: 'Invalid or expired API key'
          }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      } else if (elevenLabsResponse.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Text-to-speech rate limit exceeded',
            details: 'Too many requests to the speech service'
          }),
          { 
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      } else if (elevenLabsResponse.status === 422) {
        return new Response(
          JSON.stringify({ 
            error: 'Text-to-speech validation error',
            details: 'Invalid text or voice parameters'
          }),
          { 
            status: 422,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      throw new Error(`ElevenLabs API error: ${elevenLabsResponse.status} - ${errorText}`)
    }

    // Get the audio data
    const audioData = await elevenLabsResponse.arrayBuffer()

    console.log(`✅ Successfully generated ${audioData.byteLength} bytes of audio using cost-optimized settings`)

    if (audioData.byteLength === 0) {
      console.error('❌ Received empty audio data from ElevenLabs!')
      throw new Error('Received empty audio data')
    }

    // Return the audio file
    return new Response(audioData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.byteLength.toString(),
      },
    })

  } catch (error) {
    console.error('💥 Error in text-to-speech function:', error)
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