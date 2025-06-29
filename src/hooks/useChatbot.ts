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

export function useChatbot(unit: Unit) {
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
      console.log('🚀 Starting chat session for unit:', unit.title);
      
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
          unitTitle: unit.title
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
      
      const audioResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message.message,
          voice: 'Bella', // Default Spanish voice
          language: 'es'
        }),
      });

      if (!audioResponse.ok) {
        const errorData = await audioResponse.json().catch(() => ({ error: 'Unknown error' }));
        
        // Handle specific error cases
        if (audioResponse.status === 401) {
          console.warn('⚠️ Text-to-speech service authentication failed. Audio disabled.');
          setAudioServiceAvailable(false);
          setMessages(prev => prev.map(msg => 
            msg.id === message.id 
              ? { ...msg, audioError: true }
              : msg
          ));
          return;
        } else if (audioResponse.status === 503) {
          console.warn('⚠️ Text-to-speech service not configured. Audio disabled.');
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
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Update message with audio URL
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, audioUrl, audioError: false }
          : msg
      ));
      
      console.log('🔊 Audio generated for message:', message.id);
      
    } catch (error) {
      console.warn('⚠️ Error generating audio:', error.message);
      
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
    if (!audioServiceAvailable || message.audioError) {
      console.warn('⚠️ Audio service not available or message has audio error');
      return;
    }

    if (!message.audioUrl) {
      // Generate audio if not available
      await generateAudioForMessage(message);
      return;
    }

    try {
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = new Audio(message.audioUrl);
      setCurrentAudio(audio);
      
      // Update playing state
      setMessages(prev => prev.map(msg => ({
        ...msg,
        isPlaying: msg.id === message.id
      })));

      audio.onended = () => {
        setMessages(prev => prev.map(msg => ({
          ...msg,
          isPlaying: false
        })));
        setCurrentAudio(null);
      };

      audio.onerror = () => {
        console.error('❌ Error playing audio');
        setMessages(prev => prev.map(msg => ({
          ...msg,
          isPlaying: false,
          audioError: msg.id === message.id ? true : msg.audioError
        })));
        setCurrentAudio(null);
      };

      await audio.play();
      console.log('🔊 Playing audio for message:', message.id);
      
    } catch (error) {
      console.error('❌ Error playing audio:', error);
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
            unitTitle: unit.title
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
    
    const welcomeMessages: Record<string, string> = {
      'Encuentro Casual': `¡Hola! Soy ${agentName}. Estoy aquí en este café y me gustaría conocerte. ¿Cómo te llamas?`,
      'En la Recepción': `Buenos días, soy ${agentName}, recepcionista del hotel. ¿En qué puedo ayudarle hoy?`,
      'Saludos y Presentaciones': `¡Hola! Soy ${agentName}. Vamos a practicar presentaciones. ¿Podrías presentarte, por favor?`,
      'Información Personal': `¡Bienvenido! Soy ${agentName}. Vamos a practicar hablando sobre información personal. ¿Cómo estás hoy?`,
      'Conversación Básica': `¡Hola! Soy ${agentName}. Vamos a tener una conversación básica. ¿Qué tal tu día?`
    };

    return welcomeMessages[unit.title] || `¡Hola! Soy ${agentName}. Estoy aquí para ayudarte a practicar español. ¡Empecemos!`;
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
  }, [user, unit]);

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