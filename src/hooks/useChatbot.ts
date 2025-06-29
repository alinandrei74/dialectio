import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Unit, ChatSession, ChatTurn } from '../types/learning';

interface ChatMessage {
  id: string;
  speaker: 'student' | 'agent';
  message: string;
  timestamp: Date;
  analysis?: any;
  suggestions?: string[];
}

export function useChatbot(unit: Unit) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);

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
      
      // Añadir mensaje de bienvenida
      const welcomeMessage = await addChatTurn(data.id, 'agent', getWelcomeMessage());
      if (welcomeMessage) {
        setMessages([{
          id: welcomeMessage.id,
          speaker: 'agent',
          message: welcomeMessage.utterance || '',
          timestamp: new Date(welcomeMessage.created_at),
          suggestions: welcomeMessage.suggestions
        }]);
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

        // Generar respuesta del agente
        const agentResponse = await generateAgentResponse(message.trim(), messages.length);
        
        // Guardar respuesta del agente
        const agentTurn = await addChatTurn(
          currentSession.id, 
          'agent', 
          agentResponse.message,
          agentResponse.analysis,
          agentResponse.suggestions
        );

        if (agentTurn) {
          const agentMessage: ChatMessage = {
            id: agentTurn.id,
            speaker: 'agent',
            message: agentResponse.message,
            timestamp: new Date(agentTurn.created_at),
            analysis: agentResponse.analysis,
            suggestions: agentResponse.suggestions
          };

          setMessages(prev => [...prev, agentMessage]);

          // Verificar si debe terminar la conversación
          if (messages.length >= 8) {
            setTimeout(() => {
              endChatSession();
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.error('Error sending student message:', error);
    }

    setIsLoading(false);
  };

  // Generar respuesta del agente (simulada - en producción sería una llamada a IA)
  const generateAgentResponse = async (userMessage: string, messageCount: number) => {
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const agentName = unit.agent_name || 'Tutor';
    
    // Análisis básico del mensaje del usuario
    const analysis = {
      message_length: userMessage.length,
      contains_greeting: /hola|buenos|buenas|saludos/i.test(userMessage),
      contains_question: userMessage.includes('?'),
      language_detected: 'es', // En producción, esto sería detección real
      confidence: 0.85
    };

    // Respuestas contextuales basadas en la unidad
    const responses = getContextualResponses(unit.title, messageCount);
    const response = responses[Math.min(Math.floor(messageCount / 2), responses.length - 1)];

    return {
      message: response.message.replace('{agentName}', agentName),
      analysis,
      suggestions: response.suggestions
    };
  };

  // Obtener mensaje de bienvenida
  const getWelcomeMessage = () => {
    const agentName = unit.agent_name || 'Tutor';
    
    const welcomeMessages: Record<string, string> = {
      'Encuentro Casual': `¡Hola! Soy ${agentName}. Estoy aquí en este café y me gustaría conocerte. ¿Cómo te llamas?`,
      'En la Recepción': `Buenos días, soy ${agentName}, recepcionista del hotel. ¿En qué puedo ayudarle hoy?`,
      'Saludos y Presentaciones': `¡Hola! Soy ${agentName}. Vamos a practicar presentaciones. ¿Podrías presentarte, por favor?`,
      'Información Personal': `¡Bienvenido! Soy ${agentName}. Vamos a practicar hablando sobre información personal. ¿Cómo estás hoy?`,
      'Conversación Básica': `¡Hola! Soy ${agentName}. Vamos a tener una conversación básica. ¿Qué tal tu día?`
    };

    return welcomeMessages[unit.title] || `¡Hola! Soy ${agentName}. Estoy aquí para ayudarte a practicar. ¡Empecemos!`;
  };

  // Obtener respuestas contextuales
  const getContextualResponses = (unitTitle: string, messageCount: number) => {
    const responseTemplates: Record<string, Array<{message: string, suggestions: string[]}>> = {
      'Encuentro Casual': [
        {
          message: '¡Encantada de conocerte! Yo soy {agentName}. ¿De dónde eres?',
          suggestions: ['Practica la pronunciación', 'Uso de "ser" para origen']
        },
        {
          message: '¡Qué interesante! ¿Y a qué te dedicas?',
          suggestions: ['Vocabulario de profesiones', 'Estructura de preguntas']
        },
        {
          message: 'Me parece muy bien. ¿Te gusta vivir allí?',
          suggestions: ['Expresiones de opinión', 'Vocabulario de lugares']
        },
        {
          message: 'Ha sido un placer conocerte. ¡Que tengas un buen día!',
          suggestions: ['Despedidas formales e informales']
        }
      ],
      'En la Recepción': [
        {
          message: 'Perfecto. ¿Tiene usted una reserva?',
          suggestions: ['Uso formal "usted"', 'Vocabulario hotelero']
        },
        {
          message: 'Muy bien. ¿Podría darme su nombre, por favor?',
          suggestions: ['Fórmulas de cortesía', 'Registro formal']
        },
        {
          message: 'Excelente. Su habitación está lista. ¿Necesita ayuda con el equipaje?',
          suggestions: ['Servicios del hotel', 'Ofrecer ayuda']
        },
        {
          message: 'Perfecto. Aquí tiene la llave. ¡Disfrute su estancia!',
          suggestions: ['Entrega de servicios', 'Buenos deseos']
        }
      ]
    };

    const defaultResponses = [
      {
        message: '¡Muy bien! ¿Puedes contarme algo más sobre ti?',
        suggestions: ['Información personal básica', 'Estructura de oraciones']
      },
      {
        message: 'Interesante. ¿Qué te gusta hacer en tu tiempo libre?',
        suggestions: ['Vocabulario de hobbies', 'Expresar gustos']
      },
      {
        message: '¡Excelente! Has hecho un gran progreso en esta conversación.',
        suggestions: ['Felicitaciones', 'Resumen de aprendizaje']
      }
    ];

    return responseTemplates[unitTitle] || defaultResponses;
  };

  // Resetear conversación
  const resetConversation = () => {
    setMessages([]);
    setCurrentSession(null);
    setConversationComplete(false);
    setIsLoading(false);
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
    sendStudentMessage,
    resetConversation,
    startChatSession
  };
}