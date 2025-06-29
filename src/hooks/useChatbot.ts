import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Unit, ChatSession, ChatTurn } from '../types/learning';

interface ChatMessage {
  id: string;
  speaker: 'student' | 'agent';
  message: string;
  timestamp: Date;
  analysis?: {
    grammar_errors: string[];
    vocabulary_suggestions: string[];
    fluency_score: number;
    confidence_level: 'low' | 'medium' | 'high';
  };
  suggestions?: string[];
  audioUrl?: string;
  isPlaying?: boolean;
  audioError?: boolean;
}

export function useChatbot(unit: Unit, targetLanguage: string) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [audioServiceAvailable, setAudioServiceAvailable] = useState(true);

  // Inicializar sesión de chat
  const startChatSession = async () => {
    if (!user || !unit) return;

    try {
      console.log('🚀 Starting chat session for unit:', unit.title, 'in language:', targetLanguage);
      
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: user.id,
          unit_id: unit.id,
          error_vector: [],
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      setCurrentSession(data);
      
      console.log('✅ Chat session created:', data.id);
      
      // Generar mensaje de bienvenida usando IA
      await generateWelcomeMessage(data.id);
      
    } catch (error) {
      console.error('❌ Error starting chat session:', error);
    }
  };

  // Generar mensaje de bienvenida con IA
  const generateWelcomeMessage = async (sessionId: string) => {
    try {
      setIsLoading(true);
      
      const welcomeResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unitId: unit.id,
          userMessage: '[INICIO_CONVERSACION]',
          conversationHistory: [],
          agentName: unit.agent_name || 'Tutor',
          agentPrompt: unit.agent_prompt || `Inicia una conversación sobre "${unit.title}". Saluda al estudiante y haz una pregunta inicial para comenzar la práctica.`,
          unitTitle: unit.title,
          targetLanguage: targetLanguage // Pass target language to AI
        }),
      });

      if (!welcomeResponse.ok) {
        throw new Error('Failed to generate welcome message');
      }

      const welcomeData = await welcomeResponse.json();
      
      // Guardar mensaje de bienvenida
      const welcomeMessage = await addChatTurn(
        sessionId, 
        'agent', 
        welcomeData.message,
        welcomeData.analysis,
        welcomeData.suggestions
      );
      
      if (welcomeMessage) {
        const messageObj: ChatMessage = {
          id: welcomeMessage.id,
          speaker: 'agent',
          message: welcomeData.message,
          timestamp: new Date(welcomeMessage.created_at),
          analysis: welcomeData.analysis,
          suggestions: welcomeData.suggestions
        };

        setMessages([messageObj]);
        
        // Generar audio para el mensaje de bienvenida (sin bloquear la UI)
        if (audioServiceAvailable) {
          generateAudioForMessage(messageObj).catch(error => {
            console.warn('⚠️ Audio generation failed for welcome message:', error.message);
          });
        }
      }
      
    } catch (error) {
      console.error('❌ Error generating welcome message:', error);
      // Fallback to simple welcome message
      const fallbackMessage = await addChatTurn(sessionId, 'agent', getSimpleWelcomeMessage());
      if (fallbackMessage) {
        setMessages([{
          id: fallbackMessage.id,
          speaker: 'agent',
          message: fallbackMessage.utterance || '',
          timestamp: new Date(fallbackMessage.created_at)
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Generar audio para un mensaje
  const generateAudioForMessage = async (message: ChatMessage) => {
    if (message.speaker !== 'agent' || !audioServiceAvailable) return;

    try {
      setIsGeneratingAudio(true);
      console.log('🔊 Starting audio generation for message:', message.id, 'Text:', message.message.substring(0, 50) + '...');
      console.log('🌍 Target language:', targetLanguage);
      
      const audioResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message.message,
          voice: 'auto', // Use auto to select cheapest voice for language
          language: targetLanguage // Pass the target language
        }),
      });

      console.log('📡 Audio API response status:', audioResponse.status, audioResponse.statusText);

      if (!audioResponse.ok) {
        const errorData = await audioResponse.json().catch(() => ({ error: 'Unknown error' }));
        console.warn('⚠️ Audio API error response:', errorData);
        
        // Handle specific error cases gracefully
        if (audioResponse.status === 401) {
          console.info('ℹ️ Text-to-speech service authentication failed. Audio disabled for this session.');
          setAudioServiceAvailable(false);
          setMessages(prev => prev.map(msg => 
            msg.id === message.id 
              ? { ...msg, audioError: true }
              : msg
          ));
          return;
        } else if (audioResponse.status === 503) {
          console.info('ℹ️ Text-to-speech service not configured. Audio disabled for this session.');
          setAudioServiceAvailable(false);
          setMessages(prev => prev.map(msg => 
            msg.id === message.id 
              ? { ...msg, audioError: true }
              : msg
          ));
          return;
        } else if (audioResponse.status === 429) {
          console.warn('⚠️ Text-to-speech rate limit exceeded. Skipping audio for this message.');
          setMessages(prev => prev.map(msg => 
            msg.id === message.id 
              ? { ...msg, audioError: true }
              : msg
          ));
          return;
        }

        throw new Error(errorData.details || errorData.error || 'Failed to generate audio');
      }

      const audioBlob = await audioResponse.blob();
      console.log('📦 Audio blob received - Size:', audioBlob.size, 'bytes, Type:', audioBlob.type);
      
      if (audioBlob.size === 0) {
        console.error('❌ Audio blob is empty!');
        throw new Error('Received empty audio data');
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('🔗 Audio URL created:', audioUrl);
      
      // Update message with audio URL
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, audioUrl, audioError: false }
          : msg
      ));
      
      console.log('✅ Audio generated successfully for message:', message.id);
      
    } catch (error) {
      console.warn('⚠️ Error generating audio:', error);
      
      // Mark message as having audio error but don't break the flow
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, audioError: true }
          : msg
      ));
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Reproducir audio de un mensaje
  const playMessageAudio = async (message: ChatMessage) => {
    console.log('🎵 playMessageAudio called for message:', message.id);
    console.log('🔍 Audio service available:', audioServiceAvailable);
    console.log('🔍 Message has audio error:', message.audioError);
    console.log('🔍 Message audio URL:', message.audioUrl);

    if (!audioServiceAvailable || message.audioError) {
      console.warn('⚠️ Audio service not available or message has audio error');
      return;
    }

    if (!message.audioUrl) {
      console.log('🔄 No audio URL found, generating audio...');
      // Generate audio if not available
      await generateAudioForMessage(message);
      return;
    }

    try {
      console.log('🎵 Starting audio playback for URL:', message.audioUrl);
      
      // Stop current audio if playing
      if (currentAudio) {
        console.log('⏹️ Stopping current audio');
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = new Audio(message.audioUrl);
      setCurrentAudio(audio);
      
      console.log('🎵 Audio object created, setting up event listeners');
      
      // Update playing state
      setMessages(prev => prev.map(msg => ({
        ...msg,
        isPlaying: msg.id === message.id
      })));

      audio.onended = () => {
        console.log('✅ Audio playback ended successfully');
        setMessages(prev => prev.map(msg => ({
          ...msg,
          isPlaying: false
        })));
        setCurrentAudio(null);
      };

      audio.onerror = (event) => {
        console.error('❌ Audio playback error:', event);
        console.error('❌ Audio error details:', {
          error: audio.error,
          networkState: audio.networkState,
          readyState: audio.readyState,
          src: audio.src
        });
        setMessages(prev => prev.map(msg => ({
          ...msg,
          isPlaying: false,
          audioError: msg.id === message.id ? true : msg.audioError
        })));
        setCurrentAudio(null);
      };

      audio.onloadstart = () => {
        console.log('📡 Audio loading started');
      };

      audio.oncanplay = () => {
        console.log('✅ Audio can start playing');
      };

      audio.onloadeddata = () => {
        console.log('📦 Audio data loaded');
      };

      console.log('▶️ Attempting to play audio...');
      await audio.play();
      console.log('🎵 Audio.play() called successfully');
      
    } catch (error) {
      console.error('💥 Error in playMessageAudio:', error);
      console.error('💥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setMessages(prev => prev.map(msg => ({
        ...msg,
        isPlaying: false,
        audioError: msg.id === message.id ? true : msg.audioError
      })));
    }
  };

  // Finalizar sesión de chat
  const endChatSession = async () => {
    if (!currentSession) return;

    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({
          finished_at: new Date().toISOString()
        })
        .eq('id', currentSession.id);

      if (error) throw error;
      setConversationComplete(true);
      console.log('✅ Chat session completed');
    } catch (error) {
      console.error('❌ Error ending chat session:', error);
    }
  };

  // Añadir turno de conversación
  const addChatTurn = async (sessionId: string, speaker: 'student' | 'agent', utterance: string, analysis?: any, suggestions?: string[]) => {
    try {
      const { data, error } = await supabase
        .from('chat_turns')
        .insert({
          session_id: sessionId,
          speaker,
          utterance,
          analysis,
          suggestions
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('❌ Error adding chat turn:', error);
      return null;
    }
  };

  // Enviar mensaje del estudiante
  const sendStudentMessage = async (message: string) => {
    if (!currentSession || !message.trim()) return;

    setIsLoading(true);

    try {
      console.log('📤 Sending student message:', message);
      
      // Guardar mensaje del estudiante
      const studentTurn = await addChatTurn(currentSession.id, 'student', message.trim());
      
      if (studentTurn) {
        const studentMessage: ChatMessage = {
          id: studentTurn.id,
          speaker: 'student',
          message: message.trim(),
          timestamp: new Date(studentTurn.created_at)
        };

        setMessages(prev => [...prev, studentMessage]);

        // Preparar historial de conversación para la IA
        const conversationHistory = messages.map(msg => ({
          role: msg.speaker === 'student' ? 'user' as const : 'assistant' as const,
          content: msg.message
        }));

        // Generar respuesta del agente usando IA
        const aiResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            unitId: unit.id,
            userMessage: message.trim(),
            conversationHistory,
            agentName: unit.agent_name || 'Tutor',
            agentPrompt: unit.agent_prompt || `Continúa la conversación sobre "${unit.title}". Proporciona retroalimentación constructiva y mantén la conversación fluida.`,
            unitTitle: unit.title,
            targetLanguage: targetLanguage // Pass target language to AI
          }),
        });

        if (!aiResponse.ok) {
          throw new Error('Failed to get AI response');
        }

        const aiData = await aiResponse.json();
        
        // Guardar respuesta del agente
        const agentTurn = await addChatTurn(
          currentSession.id, 
          'agent', 
          aiData.message,
          aiData.analysis,
          aiData.suggestions
        );

        if (agentTurn) {
          const agentMessage: ChatMessage = {
            id: agentTurn.id,
            speaker: 'agent',
            message: aiData.message,
            timestamp: new Date(agentTurn.created_at),
            analysis: aiData.analysis,
            suggestions: aiData.suggestions
          };

          setMessages(prev => [...prev, agentMessage]);

          // Generar audio para la respuesta del agente (sin bloquear la UI)
          if (audioServiceAvailable) {
            generateAudioForMessage(agentMessage).catch(error => {
              console.warn('⚠️ Audio generation failed for agent response:', error.message);
            });
          }

          // Verificar si debe terminar la conversación
          if (aiData.conversationComplete || messages.length >= 16) {
            setTimeout(() => {
              endChatSession();
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error sending student message:', error);
    }

    setIsLoading(false);
  };

  // Obtener mensaje de bienvenida simple (fallback)
  const getSimpleWelcomeMessage = () => {
    const agentName = unit.agent_name || 'Tutor';
    
    // Get language-specific welcome messages
    const getWelcomeByLanguage = (lang: string) => {
      switch (lang) {
        case 'it':
          return `Ciao! Sono ${agentName}. Sono qui per aiutarti a praticare l'italiano. Come stai oggi?`;
        case 'fr':
          return `Bonjour! Je suis ${agentName}. Je suis ici pour t'aider à pratiquer le français. Comment allez-vous?`;
        case 'pt':
          return `Olá! Eu sou ${agentName}. Estou aqui para te ajudar a praticar português. Como está você?`;
        case 'en':
          return `Hello! I'm ${agentName}. I'm here to help you practice English. How are you today?`;
        case 'es':
        default:
          return `¡Hola! Soy ${agentName}. Estoy aquí para ayudarte a practicar español. ¿Cómo estás hoy?`;
      }
    };

    return getWelcomeByLanguage(targetLanguage);
  };

  // Resetear conversación
  const resetConversation = () => {
    // Stop any playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }

    // Clean up audio URLs
    messages.forEach(msg => {
      if (msg.audioUrl) {
        URL.revokeObjectURL(msg.audioUrl);
      }
    });

    setMessages([]);
    setCurrentSession(null);
    setConversationComplete(false);
    setIsLoading(false);
    setIsGeneratingAudio(false);
    setAudioServiceAvailable(true); // Reset audio service availability
  };

  // Cargar sesión existente si existe
  useEffect(() => {
    if (user && unit && !currentSession) {
      startChatSession();
    }

    // Cleanup on unmount
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      // Clean up audio URLs
      messages.forEach(msg => {
        if (msg.audioUrl) {
          URL.revokeObjectURL(msg.audioUrl);
        }
      });
    };
  }, [user, unit, targetLanguage]); // Re-initialize when target language changes

  return {
    messages,
    isLoading,
    isGeneratingAudio,
    conversationComplete,
    audioServiceAvailable,
    sendStudentMessage,
    resetConversation,
    startChatSession,
    playMessageAudio
  };
}