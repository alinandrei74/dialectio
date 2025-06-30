// Archivo: /supabase/functions/tts.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface TTSRequest {
  text: string
  voice?: string
  language?: string
}

serve(async (req) => {
  // CORS pre-flight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text, voice = "auto", language = "es" }: TTSRequest = await req.json()

    if (!text || text.trim().length === 0) {
      throw new Error("Text is required for speech synthesis")
    }

    console.log(
      `TTS Request – Text: "${text.substring(0, 100)}...", Voice: ${voice}, Language: ${language}`,
    )

    // Clave API
    const elevenLabsApiKey = Deno.env.get("ELEVENLABS_API_KEY")
    if (!elevenLabsApiKey) {
      return new Response(
        JSON.stringify({
          error: "Text-to-speech service not configured",
          details: "API key missing",
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    // Voces económicas válidas (IDs vigentes junio 2025)
    const voiceIds: Record<string, string> = {
      // Español
      Mila: "JHVoEhIATOgU9MXpfMYg",
      Sergio: "Mcu5ly1OVuL5PaS7sfMJ",

      // Francés
      Charlotte: "XB0fDUnXU5powFXDhCwa",
      Antoine: "ErXwobaYiN019PkySvjV",

      // Italiano
      Giulia: "jsCqWAovK2LkecY7zXl4",
      Giovanni: "zcAOhNBS3c14rBihAFp1",

      // Portugués
      Camila: "XrExE9yKIg1WjnnlVkGX",
      Ricardo: "onwK4e9ZLuTAKqWW03F9",

      // Inglés
      Sarah: "EXAVITQu4vr4xnSDxMaL",
      Michael: "flq6f7yk4E4fJM5XTYuZ",
    }

    // Selección de voz
    let selectedVoiceId: string
    if (voice === "auto") {
      switch (language) {
        case "es":
          selectedVoiceId = voiceIds["Mila"]
          break
        case "fr":
          selectedVoiceId = voiceIds["Charlotte"]
          break
        case "it":
          selectedVoiceId = voiceIds["Giulia"]
          break
        case "pt":
          selectedVoiceId = voiceIds["Camila"]
          break
        case "en":
          selectedVoiceId = voiceIds["Sarah"]
          break
        default:
          selectedVoiceId = voiceIds["Mila"]
      }
    } else {
      selectedVoiceId = voiceIds[voice] || voiceIds["Mila"]
    }

    // Modelo: turbo solo para inglés; multilingüe para el resto
    const model_id = language === "en" ? "eleven_turbo_v2" : "eleven_turbo_v2_5"

    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: false,
          },
        }),
      },
    )

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text()
      throw new Error(`ElevenLabs API error: ${elevenLabsResponse.status} – ${errorText}`)
    }

    const audioData = await elevenLabsResponse.arrayBuffer()
    if (audioData.byteLength === 0) {
      throw new Error("Received empty audio data")
    }

    return new Response(audioData, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Content-Length": audioData.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error("Error in text-to-speech function:", error)
    return new Response(
      JSON.stringify({ error: "Error generating speech", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }
})
