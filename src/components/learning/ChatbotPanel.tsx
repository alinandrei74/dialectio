import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Mic, MicOff, Volume2, RotateCcw, CheckCircle, Loader, Play, Pause, AlertTriangle } from 'lucide-react';
import { Unit } from '../../types/learning';
import { useChatbot } from '../../hooks/useChatbot';

interface ChatbotPanelProps {
  unit: Unit;
  onComplete?: () => void;
}

function ChatbotPanel({ unit, onComplete }: ChatbotPanelProps) {
  const { messages, isLoading, conversationComplete, isPlayingAudio, sendStudentMessage, resetConversation, playAudio } = useChatbot(unit);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState<string | null>(null);

  // Handle conversation completion
  useEffect(() => {
    if (conversationComplete && onComplete) {
      onComplete();
    }
  }, [conversationComplete, onComplete]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    await sendStudentMessage(currentMessage);
    setCurrentMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Tu navegador no soporta reconocimiento de voz');
    }
  };

  const handlePlayAudio = (audioUrl: string) => {
    playAudio(audioUrl);
  };

  const toggleAnalysis = (messageId: string) => {
    setShowAnalysis(showAnalysis === messageId ? null : messageId);
  };

  const getFluidityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getFluidityLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bueno';
    if (score >= 40) return 'Regular';
    return 'Necesita práctica';
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
                Conversación con {unit.agent_name || 'Tutor IA'}
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-bold">
              Iniciando conversación con IA...
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.speaker === 'student' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${
              message.speaker === 'student' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            } p-4 border-2 border-black dark:border-gray-300 shadow-lg`}
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {message.speaker === 'student' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm break-words">
                    {message.message}
                  </p>
                  
                  {/* Agent message controls */}
                  {message.speaker === 'agent' && (
                    <div className="flex items-center space-x-2 mt-2">
                      {/* Audio playback button */}
                      {message.audioUrl && (
                        <button
                          onClick={() => handlePlayAudio(message.audioUrl!)}
                          disabled={isPlayingAudio}
                          className="text-xs opacity-70 hover:opacity-100 transition-opacity flex items-center space-x-1 p-1 rounded hover:bg-black/10 disabled:opacity-50"
                          title="Reproducir audio"
                        >
                          {isPlayingAudio ? (
                            <Pause className="w-3 h-3" />
                          ) : (
                            <Play className="w-3 h-3" />
                          )}
                          <span>Audio IA</span>
                        </button>
                      )}
                      
                      {/* Analysis toggle button */}
                      {message.analysis && (
                        <button
                          onClick={() => toggleAnalysis(message.id)}
                          className="text-xs opacity-70 hover:opacity-100 transition-opacity flex items-center space-x-1 p-1 rounded hover:bg-black/10"
                          title="Ver análisis"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span>Análisis</span>
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Analysis panel */}
                  {message.analysis && showAnalysis === message.id && (
                    <div className="mt-3 p-3 bg-black/10 rounded text-xs space-y-2">
                      {/* Fluency Score */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Fluidez:</span>
                        <span className={`font-black ${getFluidityColor(message.analysis.fluency_score)}`}>
                          {message.analysis.fluency_score}/100 ({getFluidityLabel(message.analysis.fluency_score)})
                        </span>
                      </div>
                      
                      {/* Grammar Errors */}
                      {message.analysis.grammar_errors.length > 0 && (
                        <div>
                          <div className="font-bold mb-1 text-red-600 dark:text-red-400">🔴 Errores gramaticales:</div>
                          <ul className="space-y-1 opacity-90">
                            {message.analysis.grammar_errors.map((error, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <span className="text-xs">•</span>
                                <span>{error}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Vocabulary Suggestions */}
                      {message.analysis.vocabulary_suggestions.length > 0 && (
                        <div>
                          <div className="font-bold mb-1 text-blue-600 dark:text-blue-400">📚 Vocabulario:</div>
                          <ul className="space-y-1 opacity-90">
                            {message.analysis.vocabulary_suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <span className="text-xs">•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Pronunciation Tips */}
                      {message.analysis.pronunciation_tips.length > 0 && (
                        <div>
                          <div className="font-bold mb-1 text-purple-600 dark:text-purple-400">🗣️ Pronunciación:</div>
                          <ul className="space-y-1 opacity-90">
                            {message.analysis.pronunciation_tips.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <span className="text-xs">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 p-2 bg-black/10 rounded text-xs">
                      <div className="font-bold mb-1 flex items-center space-x-1">
                        <span>💡</span>
                        <span>Consejos:</span>
                      </div>
                      <ul className="space-y-1 opacity-90">
                        {message.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-xs">•</span>
                            <span>{suggestion}</span>
                          </li>
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
            <div className="bg-gray-200 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-300 shadow-lg"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="flex items-center space-x-3">
                <Bot className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    IA pensando...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {!conversationComplete && (
        <div className="p-4 border-t-3 border-black dark:border-gray-300 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-end space-x-3">
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
                onClick={isListening ? () => setIsListening(false) : startVoiceRecognition}
                className={`absolute right-3 top-3 p-2 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
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
          
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 font-bold text-center">
            Presiona Enter para enviar • Shift+Enter para nueva línea • Conversación potenciada por IA
          </div>
        </div>
      )}

      {/* Completion Actions */}
      {conversationComplete && (
        <div className="p-4 border-t-3 border-black dark:border-gray-300 bg-green-50/90 dark:bg-green-900/30">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200 font-bold">
                ¡Excelente trabajo! Has completado esta conversación con IA.
              </p>
            </div>
            
            <div className="bg-green-100/90 dark:bg-green-800/30 border-2 border-green-500 p-4 shadow-md"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <div className="text-green-800 dark:text-green-200 font-bold text-sm mb-2">
                📈 Resumen de la conversación:
              </div>
              <div className="text-green-700 dark:text-green-300 font-bold text-sm">
                • {messages.filter(m => m.speaker === 'student').length} mensajes enviados
                • Conversación completada exitosamente
                • ¡Sigue practicando para mejorar tu fluidez!
              </div>
            </div>
            
            <button
              onClick={resetConversation}
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-sm border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Nueva conversación</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotPanel;