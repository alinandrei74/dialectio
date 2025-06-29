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
    pronunciation_tips: string[];
    fluency_score: number;
  };
  suggestions?: string[];
  audioUrl?: string;
}

interface AIResponse {
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

export function useChatbot(unit: Unit) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Inicializar sesión de chat
  const startChatSession = async () => {
    if (!user || !unit) return;

    try {
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
      
      // Añadir mensaje de bienvenida usando IA
      const welcomeMessage = await generateWelcomeMessage();
      if (welcomeMessage) {
        const agentTurn = await addChatTurn(data.id, 'agent', welcomeMessage.message, welcomeMessage.analysis, welcomeMessage.suggestions);
        if (agentTurn) {
          setMessages([{
            id: agentTurn.id,
            speaker: 'agent',
            message: welcomeMessage.message,
            timestamp: new Date(agentTurn.created_at),
            analysis: welcomeMessage.analysis,
            suggestions: welcomeMessage.suggestions,
            audioUrl: welcomeMessage.audioUrl
          }]);
        }
      }
    } catch (error) {
      console.error('Error starting chat session:', error);
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
    } catch (error) {
      console.error('Error ending chat session:', error);
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
      console.error('Error adding chat turn:', error);
      return null;
    }
  };

  // Generar mensaje de bienvenida usando IA
  const generateWelcomeMessage = async (): Promise<AIResponse | null> => {
    try {
      const response = await callAIChat('¡Hola!', []);
      return response;
    } catch (error) {
      console.error('Error generating welcome message:', error);
      // Fallback to default welcome message
      return {
        message: `¡Hola! Soy ${unit.agent_name || 'tu tutor'}. Estoy aquí para ayudarte a practicar. ¡Empecemos!`,
        analysis: {
          grammar_errors: [],
          vocabulary_suggestions: [],
          pronunciation_tips: [],
          fluency_score: 0
        },
        suggestions: ['Preséntate y cuéntame sobre ti', 'Haz preguntas sobre el tema', 'Practica vocabulario nuevo']
      };
    }
  };

  // Llamar a la función de IA
  const callAIChat = async (userMessage: string, conversationHistory: Array<{role: 'user' | 'assistant', content: string}>): Promise<AIResponse> => {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
    
    const headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    const requestBody = {
      message: userMessage,
      unitTitle: unit.title,
      agentName: unit.agent_name || 'Tutor',
      agentPrompt: unit.agent_prompt,
      conversationHistory,
      targetLanguage: 'español', // This could be dynamic based on course
      userLevel: 'intermediate' // This could be dynamic based on user progress
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`AI Chat API error: ${response.status}`);
    }

    return await response.json();
  };

  // Enviar mensaje del estudiante
  const sendStudentMessage = async (message: string) => {
    if (!currentSession || !message.trim()) return;

    setIsLoading(true);

    try {
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
        const aiResponse = await callAIChat(message.trim(), conversationHistory);
        
        // Guardar respuesta del agente
        const agentTurn = await addChatTurn(
          currentSession.id, 
          'agent', 
          aiResponse.message,
          aiResponse.analysis,
          aiResponse.suggestions
        );

        if (agentTurn) {
          const agentMessage: ChatMessage = {
            id: agentTurn.id,
            speaker: 'agent',
            message: aiResponse.message,
            timestamp: new Date(agentTurn.created_at),
            analysis: aiResponse.analysis,
            suggestions: aiResponse.suggestions,
            audioUrl: aiResponse.audioUrl
          };

          setMessages(prev => [...prev, agentMessage]);

          // Verificar si debe terminar la conversación (después de 10-12 intercambios)
          if (messages.length >= 20) {
            setTimeout(() => {
              endChatSession();
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.error('Error sending student message:', error);
      
      // Add fallback message in case of AI failure
      const fallbackMessage: ChatMessage = {
        id: `fallback-${Date.now()}`,
        speaker: 'agent',
        message: 'Lo siento, ha ocurrido un problema técnico. ¿Podrías repetir tu mensaje?',
        timestamp: new Date(),
        analysis: {
          grammar_errors: [],
          vocabulary_suggestions: [],
          pronunciation_tips: [],
          fluency_score: 0
        },
        suggestions: ['Intenta reformular tu mensaje', 'Usa palabras más simples', 'Verifica tu conexión a internet']
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    }

    setIsLoading(false);
  };

  // Reproducir audio
  const playAudio = async (audioUrl: string) => {
    if (!audioUrl || isPlayingAudio) return;

    try {
      setIsPlayingAudio(true);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlayingAudio(false);
      };
      
      audio.onerror = () => {
        setIsPlayingAudio(false);
        console.error('Error playing audio');
      };

      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlayingAudio(false);
    }
  };

  // Resetear conversación
  const resetConversation = () => {
    setMessages([]);
    setCurrentSession(null);
    setConversationComplete(false);
    setIsLoading(false);
    setIsPlayingAudio(false);
  };

  // Cargar sesión existente si existe
  useEffect(() => {
    if (user && unit && !currentSession) {
      startChatSession();
    }
  }, [user, unit]);

  return {
    messages,
    isLoading,
    conversationComplete,
    isPlayingAudio,
    sendStudentMessage,
    resetConversation,
    startChatSession,
    playAudio
  };
}