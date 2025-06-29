import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Mic, MicOff, Volume2, RotateCcw, CheckCircle } from 'lucide-react';
import { Unit } from '../../types/learning';

interface ChatMessage {
  id: string;
  speaker: 'student' | 'agent';
  message: string;
  timestamp: Date;
  analysis?: any;
  suggestions?: string[];
}

interface ChatbotPanelProps {
  unit: Unit;
  onComplete?: () => void;
}

function ChatbotPanel({ unit, onComplete }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);

  // Inicializar conversación con mensaje del agente
  useEffect(() => {
    if (unit && unit.kind === 'situation' && !sessionStarted) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        speaker: 'agent',
        message: getWelcomeMessage(),
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setSessionStarted(true);
    }
  }, [unit, sessionStarted]);

  const getWelcomeMessage = () => {
    const agentName = unit.agent_name || 'Tutor';
    
    // Mensajes de bienvenida basados en el título de la unidad
    const welcomeMessages = {
      'Encuentro Casual': `¡Hola! Soy ${agentName}. Estoy aquí en este café y me gustaría conocerte. ¿Cómo te llamas?`,
      'En la Recepción': `Buenos días, soy ${agentName}, recepcionista del hotel. ¿En qué puedo ayudarle hoy?`,
      'Situación A': `¡Hola! Soy ${agentName}. Vamos a practicar presentaciones. ¿Podrías presentarte, por favor?`,
      'Situación B': `¡Bienvenido! Soy ${agentName}, su camarero. ¿Cómo está usted hoy?`,
      default: `¡Hola! Soy ${agentName}. Estoy aquí para ayudarte a practicar español. ¡Empecemos!`
    };

    return welcomeMessages[unit.title as keyof typeof welcomeMessages] || welcomeMessages.default;
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      speaker: 'student',
      message: currentMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simular respuesta del agente (en producción, esto sería una llamada a la API del chatbot)
    setTimeout(() => {
      const agentResponse = generateAgentResponse(userMessage.message, messages.length);
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        speaker: 'agent',
        message: agentResponse.message,
        timestamp: new Date(),
        suggestions: agentResponse.suggestions
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);

      // Verificar si la conversación debe terminar
      if (messages.length >= 8) { // Después de 4-5 intercambios
        setTimeout(() => {
          setConversationComplete(true);
          if (onComplete) {
            onComplete();
          }
        }, 2000);
      }
    }, 1500 + Math.random() * 1000); // Simular tiempo de respuesta variable
  };

  const generateAgentResponse = (userMessage: string, messageCount: number) => {
    const agentName = unit.agent_name || 'Tutor';
    
    // Respuestas basadas en el contexto de la unidad y el progreso de la conversación
    const responses = {
      'Encuentro Casual': [
        {
          message: `¡Encantada de conocerte! Yo soy ${agentName}. ¿De dónde eres?`,
          suggestions: ['Corrige la pronunciación si es necesario', 'Practica el uso de "ser" vs "estar"']
        },
        {
          message: `¡Qué interesante! ¿Y a qué te dedicas?`,
          suggestions: ['Vocabulario de profesiones', 'Estructura de preguntas']
        },
        {
          message: `Me parece muy bien. ¿Te gusta vivir allí?`,
          suggestions: ['Expresiones de opinión', 'Vocabulario de lugares']
        },
        {
          message: `Ha sido un placer conocerte. ¡Que tengas un buen día!`,
          suggestions: ['Despedidas formales e informales']
        }
      ],
      'En la Recepción': [
        {
          message: `Perfecto. ¿Tiene usted una reserva?`,
          suggestions: ['Uso formal "usted"', 'Vocabulario hotelero']
        },
        {
          message: `Muy bien. ¿Podría darme su nombre, por favor?`,
          suggestions: ['Fórmulas de cortesía', 'Registro formal']
        },
        {
          message: `Excelente. Su habitación está lista. ¿Necesita ayuda con el equipaje?`,
          suggestions: ['Servicios del hotel', 'Ofrecer ayuda']
        },
        {
          message: `Perfecto. Aquí tiene la llave. ¡Disfrute su estancia!`,
          suggestions: ['Entrega de servicios', 'Buenos deseos']
        }
      ],
      default: [
        {
          message: `¡Muy bien! ¿Puedes contarme algo más sobre ti?`,
          suggestions: ['Información personal básica', 'Estructura de oraciones']
        },
        {
          message: `Interesante. ¿Qué te gusta hacer en tu tiempo libre?`,
          suggestions: ['Vocabulario de hobbies', 'Expresar gustos']
        },
        {
          message: `¡Excelente! Has hecho un gran progreso en esta conversación.`,
          suggestions: ['Felicitaciones', 'Resumen de aprendizaje']
        }
      ]
    };

    const unitResponses = responses[unit.title as keyof typeof responses] || responses.default;
    const responseIndex = Math.min(messageCount / 2, unitResponses.length - 1);
    
    return unitResponses[Math.floor(responseIndex)] || unitResponses[unitResponses.length - 1];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setSessionStarted(false);
    setConversationComplete(false);
    setCurrentMessage('');
  };

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
      
      {/* Header */}
      <div className="p-4 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
           style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 flex items-center justify-center transform rotate-45 border-2 border-white shadow-lg">
              <MessageCircle className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div>
              <h3 className="text-lg font-black">
                {unit.title}
              </h3>
              <p className="text-green-100 font-bold text-sm">
                Conversación con {unit.agent_name || 'Tutor'}
              </p>
            </div>
          </div>
          
          {conversationComplete && (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="font-bold text-sm">¡Completado!</span>
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.speaker === 'student' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${
              message.speaker === 'student' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            } p-3 border-2 border-black dark:border-gray-300 shadow-lg`}
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                  {message.speaker === 'student' ? (
                    <User className="w-5 h-5 mt-1" />
                  ) : (
                    <Bot className="w-5 h-5 mt-1" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1">
                    {message.message}
                  </p>
                  
                  {message.speaker === 'agent' && (
                    <button
                      onClick={() => speakMessage(message.message)}
                      className="text-xs opacity-70 hover:opacity-100 transition-opacity flex items-center space-x-1 mt-2"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Escuchar</span>
                    </button>
                  )}
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 text-xs opacity-80">
                      <div className="font-bold mb-1">💡 Consejos:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 p-3 border-2 border-black dark:border-gray-300 shadow-lg"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {!conversationComplete && (
        <div className="p-4 border-t-3 border-black dark:border-gray-300">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full px-4 py-3 pr-12 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                rows={2}
                disabled={isLoading}
              />
              
              <button
                onClick={() => setIsListening(!isListening)}
                className={`absolute right-3 top-3 p-1 rounded ${
                  isListening ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
                } hover:opacity-80 transition-opacity`}
                title={isListening ? 'Detener grabación' : 'Grabar audio'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white p-3 font-black border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Completion Actions */}
      {conversationComplete && (
        <div className="p-4 border-t-3 border-black dark:border-gray-300 bg-green-50/90 dark:bg-green-900/30">
          <div className="text-center space-y-3">
            <p className="text-green-800 dark:text-green-200 font-bold">
              ¡Excelente trabajo! Has completado esta conversación.
            </p>
            <button
              onClick={resetConversation}
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-2 font-black text-sm border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practicar de nuevo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotPanel;