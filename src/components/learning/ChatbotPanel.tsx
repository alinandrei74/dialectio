import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Mic, MicOff, Volume2, VolumeX, RotateCcw, CheckCircle, Loader, Play, Pause, AlertCircle } from 'lucide-react';
import { Unit } from '../../types/learning';
import { useChatbot } from '../../hooks/useChatbot';

interface ChatbotPanelProps {
  unit: Unit;
  targetLanguage: string; // Target language for the course
  onComplete?: () => void;
}

function ChatbotPanel({ unit, targetLanguage, onComplete }: ChatbotPanelProps) {
  // DEBUG: Log the received props
  console.log('🔍 ChatbotPanel props:');
  console.log('- Unit title:', unit.title);
  console.log('- Target language received:', targetLanguage);
  console.log('- Target language type:', typeof targetLanguage);

  const { 
    messages, 
    isLoading, 
    isGeneratingAudio,
    conversationComplete, 
    sendStudentMessage, 
    resetConversation,
    playMessageAudio
  } = useChatbot(unit, targetLanguage);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Helper function to map language codes to speech recognition language tags
  const getLanguageTag = (langCode: string): string => {
    const languageMap: Record<string, string> = {
      'es': 'es-ES',
      'fr': 'fr-FR', 
      'pt': 'pt-PT',
      'it': 'it-IT',
      'en': 'en-US'
    };
    return languageMap[langCode] || 'es-ES';
  };

  // Get language display name
  const getLanguageName = (langCode: string): string => {
    const languageNames: Record<string, string> = {
      'es': 'Español',
      'fr': 'Français',
      'pt': 'Português', 
      'it': 'Italiano',
      'en': 'English'
    };
    return languageNames[langCode] || langCode.toUpperCase();
  };

  // Get localized UI texts based on target language
  const getUITexts = (langCode: string) => {
    // DEBUG: Log what language code is being evaluated
    console.log('🔍 getUITexts called with langCode:', langCode);
    console.log('🔍 langCode type:', typeof langCode);
    console.log('🔍 langCode length:', langCode?.length);
    console.log('🔍 langCode trimmed:', langCode?.trim());

    switch (langCode) {
      case 'it':
        console.log('✅ Using Italian UI texts');
        return {
          conversationWith: 'Conversazione con',
          aiVoice: 'IA + Voce',
          completed: 'Completato!',
          generatingAudio: 'Generando audio...',
          startingConversation: 'Iniziando conversazione intelligente in',
          poweredBy: 'Powered by OpenAI • 🔊 Powered by ElevenLabs',
          thinking: 'sta pensando...',
          listeningIn: 'Ascoltando in',
          speakNow: '... Parla ora',
          speechNotAvailable: 'Riconoscimento vocale non disponibile in questo browser',
          writeResponse: 'Scrivi la tua risposta in',
          here: 'qui...',
          stopRecording: 'Ferma registrazione',
          recordAudio: 'Registra audio in',
          pressEnter: 'Premi Invio per inviare',
          useMicrophone: 'Usa il microfono per parlare in',
          shiftEnter: 'Shift+Invio per nuova riga',
          excellentWork: 'Ottimo lavoro! Hai completato questa conversazione intelligente in',
          conversationSummary: 'Riassunto della conversazione:',
          messagesSent: 'messaggi inviati',
          conversationCompleted: 'Conversazione con IA completata con successo',
          realTimeAnalysis: 'Analisi in tempo reale del tuo',
          keepPracticing: 'Continua a praticare per migliorare la tua fluidità!',
          newConversation: 'Nuova conversazione',
          pause: 'Pausa',
          listen: 'Ascolta',
          generateAudio: 'Genera audio',
          aiAnalysis: 'Analisi IA:',
          fluency: 'Fluidità:',
          confidence: 'Fiducia:',
          high: 'Alta',
          medium: 'Media',
          low: 'Bassa',
          grammarErrors: 'Errori grammaticali:',
          vocabularySuggestions: 'Suggerimenti di vocabolario:',
          tutorTips: 'Consigli del tutor:'
        };
      case 'fr':
        console.log('✅ Using French UI texts');
        return {
          conversationWith: 'Conversation avec',
          aiVoice: 'IA + Voix',
          completed: 'Terminé!',
          generatingAudio: 'Génération audio...',
          startingConversation: 'Démarrage de conversation intelligente en',
          poweredBy: 'Powered by OpenAI • 🔊 Powered by ElevenLabs',
          thinking: 'réfléchit...',
          listeningIn: 'Écoute en',
          speakNow: '... Parlez maintenant',
          speechNotAvailable: 'Reconnaissance vocale non disponible dans ce navigateur',
          writeResponse: 'Écrivez votre réponse en',
          here: 'ici...',
          stopRecording: 'Arrêter l\'enregistrement',
          recordAudio: 'Enregistrer audio en',
          pressEnter: 'Appuyez sur Entrée pour envoyer',
          useMicrophone: 'Utilisez le microphone pour parler en',
          shiftEnter: 'Maj+Entrée pour nouvelle ligne',
          excellentWork: 'Excellent travail! Vous avez terminé cette conversation intelligente en',
          conversationSummary: 'Résumé de la conversation:',
          messagesSent: 'messages envoyés',
          conversationCompleted: 'Conversation avec IA terminée avec succès',
          realTimeAnalysis: 'Analyse en temps réel de votre',
          keepPracticing: 'Continuez à pratiquer pour améliorer votre fluidité!',
          newConversation: 'Nouvelle conversation',
          pause: 'Pause',
          listen: 'Écouter',
          generateAudio: 'Générer audio',
          aiAnalysis: 'Analyse IA:',
          fluency: 'Fluidité:',
          confidence: 'Confiance:',
          high: 'Élevée',
          medium: 'Moyenne',
          low: 'Faible',
          grammarErrors: 'Erreurs grammaticales:',
          vocabularySuggestions: 'Suggestions de vocabulaire:',
          tutorTips: 'Conseils du tuteur:'
        };
      case 'pt':
        console.log('✅ Using Portuguese UI texts');
        return {
          conversationWith: 'Conversa com',
          aiVoice: 'IA + Voz',
          completed: 'Concluído!',
          generatingAudio: 'Gerando áudio...',
          startingConversation: 'Iniciando conversa inteligente em',
          poweredBy: 'Powered by OpenAI • 🔊 Powered by ElevenLabs',
          thinking: 'está pensando...',
          listeningIn: 'Ouvindo em',
          speakNow: '... Fale agora',
          speechNotAvailable: 'Reconhecimento de voz não disponível neste navegador',
          writeResponse: 'Escreva sua resposta em',
          here: 'aqui...',
          stopRecording: 'Parar gravação',
          recordAudio: 'Gravar áudio em',
          pressEnter: 'Pressione Enter para enviar',
          useMicrophone: 'Use o microfone para falar em',
          shiftEnter: 'Shift+Enter para nova linha',
          excellentWork: 'Excelente trabalho! Você completou esta conversa inteligente em',
          conversationSummary: 'Resumo da conversa:',
          messagesSent: 'mensagens enviadas',
          conversationCompleted: 'Conversa com IA concluída com sucesso',
          realTimeAnalysis: 'Análise em tempo real do seu',
          keepPracticing: 'Continue praticando para melhorar sua fluência!',
          newConversation: 'Nova conversa',
          pause: 'Pausar',
          listen: 'Ouvir',
          generateAudio: 'Gerar áudio',
          aiAnalysis: 'Análise IA:',
          fluency: 'Fluência:',
          confidence: 'Confiança:',
          high: 'Alta',
          medium: 'Média',
          low: 'Baixa',
          grammarErrors: 'Erros gramaticais:',
          vocabularySuggestions: 'Sugerências de vocabulário:',
          tutorTips: 'Dicas do tutor:'
        };
      case 'en':
        console.log('✅ Using English UI texts');
        return {
          conversationWith: 'Conversation with',
          aiVoice: 'AI + Voice',
          completed: 'Completed!',
          generatingAudio: 'Generating audio...',
          startingConversation: 'Starting intelligent conversation in',
          poweredBy: 'Powered by OpenAI • 🔊 Powered by ElevenLabs',
          thinking: 'is thinking...',
          listeningIn: 'Listening in',
          speakNow: '... Speak now',
          speechNotAvailable: 'Speech recognition not available in this browser',
          writeResponse: 'Write your response in',
          here: 'here...',
          stopRecording: 'Stop recording',
          recordAudio: 'Record audio in',
          pressEnter: 'Press Enter to send',
          useMicrophone: 'Use microphone to speak in',
          shiftEnter: 'Shift+Enter for new line',
          excellentWork: 'Excellent work! You have completed this intelligent conversation in',
          conversationSummary: 'Conversation summary:',
          messagesSent: 'messages sent',
          conversationCompleted: 'AI conversation completed successfully',
          realTimeAnalysis: 'Real-time analysis of your',
          keepPracticing: 'Keep practicing to improve your fluency!',
          newConversation: 'New conversation',
          pause: 'Pause',
          listen: 'Listen',
          generateAudio: 'Generate audio',
          aiAnalysis: 'AI Analysis:',
          fluency: 'Fluency:',
          confidence: 'Confidence:',
          high: 'High',
          medium: 'Medium',
          low: 'Low',
          grammarErrors: 'Grammar errors:',
          vocabularySuggestions: 'Vocabulary suggestions:',
          tutorTips: 'Tutor tips:'
        };
      case 'es':
      default:
        console.log('⚠️ Using Spanish UI texts (default case)');
        return {
          conversationWith: 'Conversación con',
          aiVoice: 'IA + Voz',
          completed: '¡Completado!',
          generatingAudio: 'Generando audio...',
          startingConversation: 'Iniciando conversación inteligente en',
          poweredBy: 'Powered by OpenAI • 🔊 Powered by ElevenLabs',
          thinking: 'está pensando...',
          listeningIn: 'Escuchando en',
          speakNow: '... Habla ahora',
          speechNotAvailable: 'Reconocimiento de voz no disponible en este navegador',
          writeResponse: 'Escribe tu respuesta en',
          here: 'aquí...',
          stopRecording: 'Detener grabación',
          recordAudio: 'Grabar audio en',
          pressEnter: 'Presiona Enter para enviar',
          useMicrophone: 'Usa el micrófono para hablar en',
          shiftEnter: 'Shift+Enter para nueva línea',
          excellentWork: '¡Excelente trabajo! Has completado esta conversación inteligente en',
          conversationSummary: 'Resumen de la conversación:',
          messagesSent: 'mensajes enviados',
          conversationCompleted: 'Conversación con IA completada exitosamente',
          realTimeAnalysis: 'Análisis en tiempo real de tu',
          keepPracticing: '¡Sigue practicando para mejorar tu fluidez!',
          newConversation: 'Nueva conversación',
          pause: 'Pausar',
          listen: 'Escuchar',
          generateAudio: 'Generar audio',
          aiAnalysis: 'Análisis de IA:',
          fluency: 'Fluidez:',
          confidence: 'Confianza:',
          high: 'Alta',
          medium: 'Media',
          low: 'Baja',
          grammarErrors: 'Errores gramaticales:',
          vocabularySuggestions: 'Sugerencias de vocabulario:',
          tutorTips: 'Consejos del tutor:'
        };
    }
  };

  const texts = getUITexts(targetLanguage);
  console.log('🔍 Final texts object sample:', {
    conversationWith: texts.conversationWith,
    startingConversation: texts.startingConversation
  });

  // Initialize speech recognition with target language
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Set language based on course target language
      const languageTag = getLanguageTag(targetLanguage);
      recognition.lang = languageTag;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      console.log('🎤 Speech recognition initialized for language:', languageTag);

      recognition.onstart = () => {
        setIsListening(true);
        console.log('🎤 Speech recognition started');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('🎤 Speech recognition result:', transcript);
        setCurrentMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('🎤 Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('🎤 Speech recognition ended');
        setIsListening(false);
      };

      setSpeechRecognition(recognition);
      setSpeechSupported(true);
    } else {
      console.warn('🎤 Speech recognition not supported in this browser');
      setSpeechSupported(false);
    }
  }, [targetLanguage]); // Re-initialize when target language changes

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
    if (speechRecognition && speechSupported) {
      try {
        speechRecognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopVoiceRecognition = () => {
    if (speechRecognition) {
      speechRecognition.stop();
      setIsListening(false);
    }
  };

  const handlePlayAudio = (message: any) => {
    playMessageAudio(message);
  };

  const getAnalysisColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getFluidityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
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
                {texts.conversationWith} {unit.agent_name || 'Tutor'} • {getLanguageName(targetLanguage)} • {texts.aiVoice}
              </p>
            </div>
          </div>
          
          {conversationComplete && (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="font-bold text-sm">{texts.completed}</span>
            </div>
          )}

          {isGeneratingAudio && (
            <div className="flex items-center space-x-2">
              <Loader className="w-5 h-5 animate-spin text-white" />
              <span className="font-bold text-sm">{texts.generatingAudio}</span>
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
              {texts.startingConversation} {getLanguageName(targetLanguage)}...
            </p>
            <p className="text-gray-500 dark:text-gray-500 font-bold text-sm mt-2">
              🤖 {texts.poweredBy}
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
                  
                  {/* Audio Controls for Agent Messages */}
                  {message.speaker === 'agent' && (
                    <div className="flex items-center space-x-2 mt-3">
                      <button
                        onClick={() => handlePlayAudio(message)}
                        disabled={isGeneratingAudio}
                        className="text-xs opacity-70 hover:opacity-100 transition-opacity flex items-center space-x-1 p-2 rounded hover:bg-black/10 disabled:opacity-50"
                        title={message.audioUrl ? texts.listen : texts.generateAudio}
                      >
                        {message.isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : message.audioUrl ? (
                          <Volume2 className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        <span>
                          {message.isPlaying ? texts.pause : 
                           message.audioUrl ? texts.listen : 
                           texts.generateAudio}
                        </span>
                      </button>
                    </div>
                  )}
                  
                  {/* Analysis for Student Messages */}
                  {message.speaker === 'student' && message.analysis && (
                    <div className="mt-3 p-3 bg-black/10 rounded text-xs">
                      <div className="font-bold mb-2 flex items-center space-x-1">
                        <span>📊</span>
                        <span>{texts.aiAnalysis}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {/* Fluency Score */}
                        <div className="flex items-center justify-between">
                          <span>{texts.fluency}</span>
                          <span className={`font-bold ${getFluidityColor(message.analysis.fluency_score)}`}>
                            {message.analysis.fluency_score}/100
                          </span>
                        </div>
                        
                        {/* Confidence Level */}
                        <div className="flex items-center justify-between">
                          <span>{texts.confidence}</span>
                          <span className={`font-bold ${getAnalysisColor(message.analysis.confidence_level)}`}>
                            {message.analysis.confidence_level === 'high' ? texts.high :
                             message.analysis.confidence_level === 'medium' ? texts.medium : texts.low}
                          </span>
                        </div>
                        
                        {/* Grammar Errors */}
                        {message.analysis.grammar_errors.length > 0 && (
                          <div>
                            <div className="font-bold text-red-600 dark:text-red-400 mb-1">
                              ⚠️ {texts.grammarErrors}
                            </div>
                            <ul className="space-y-1">
                              {message.analysis.grammar_errors.map((error, index) => (
                                <li key={index} className="text-red-600 dark:text-red-400">
                                  • {error}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Vocabulary Suggestions */}
                        {message.analysis.vocabulary_suggestions.length > 0 && (
                          <div>
                            <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">
                              💡 {texts.vocabularySuggestions}
                            </div>
                            <ul className="space-y-1">
                              {message.analysis.vocabulary_suggestions.map((suggestion, index) => (
                                <li key={index} className="text-blue-600 dark:text-blue-400">
                                  • {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Teaching Suggestions for Agent Messages */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 p-2 bg-black/10 rounded text-xs">
                      <div className="font-bold mb-1 flex items-center space-x-1">
                        <span>🎯</span>
                        <span>{texts.tutorTips}</span>
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
                    {unit.agent_name || 'Tutor'} {texts.thinking}
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
          {/* Speech Recognition Status */}
          {isListening && (
            <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 text-center font-bold text-sm flex items-center justify-center space-x-2"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <Mic className="w-4 h-4 animate-pulse" />
              <span>{texts.listeningIn} {getLanguageName(targetLanguage)}{texts.speakNow}</span>
            </div>
          )}

          {/* Speech Recognition Error */}
          {!speechSupported && (
            <div className="mb-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 text-yellow-700 dark:text-yellow-300 text-center font-bold text-xs flex items-center justify-center space-x-2"
                 style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
              <AlertCircle className="w-4 h-4" />
              <span>{texts.speechNotAvailable}</span>
            </div>
          )}

          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`${texts.writeResponse} ${getLanguageName(targetLanguage)} ${texts.here}`}
                className="w-full px-4 py-3 pr-12 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                rows={2}
                disabled={isLoading}
              />
              
              {/* Voice Recognition Button */}
              {speechSupported && (
                <button
                  onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                  disabled={isLoading}
                  className={`absolute right-3 top-3 p-2 rounded-full transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                  } disabled:opacity-50`}
                  title={isListening ? texts.stopRecording : `${texts.recordAudio} ${getLanguageName(targetLanguage)}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
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
            {texts.pressEnter} • {speechSupported ? `${texts.useMicrophone} ${getLanguageName(targetLanguage)} • ` : ''}{texts.shiftEnter}
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
                {texts.excellentWork} {getLanguageName(targetLanguage)}.
              </p>
            </div>
            
            <div className="bg-green-100/90 dark:bg-green-800/30 border-2 border-green-500 p-4 shadow-md"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <div className="text-green-800 dark:text-green-200 font-bold text-sm mb-2">
                🎯 {texts.conversationSummary}
              </div>
              <div className="text-green-700 dark:text-green-300 font-bold text-sm">
                • {messages.filter(m => m.speaker === 'student').length} {texts.messagesSent}
                • {texts.conversationCompleted}
                • {texts.realTimeAnalysis} {getLanguageName(targetLanguage)}
                • {texts.keepPracticing}
              </div>
            </div>
            
            <button
              onClick={resetConversation}
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-sm border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{texts.newConversation}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotPanel;