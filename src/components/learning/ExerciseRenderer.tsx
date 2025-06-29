import React from 'react';
import { Volume2, Play } from 'lucide-react';
import { Exercise, MultipleChoiceContent, FillBlankContent, TranslationContent, AudioContent, ConversationContent } from '../../types/learning';

interface ExerciseRendererProps {
  exercise: Exercise;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  isCompleted: boolean;
  showHints?: boolean;
}

function ExerciseRenderer({ exercise, userAnswer, onAnswerChange, isCompleted, showHints = false }: ExerciseRendererProps) {
  
  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(console.error);
  };

  const speakText = (text: string, lang: string = 'es') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : lang === 'pt' ? 'pt-PT' : lang === 'it' ? 'it-IT' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const renderHints = (hints?: string[]) => {
    if (!showHints || !hints || hints.length === 0) return null;

    return (
      <div className="mt-4 p-3 bg-yellow-50/90 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-500 shadow-md"
           style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
        <div className="text-yellow-800 dark:text-yellow-200 font-bold text-sm mb-2">
          💡 Pistas:
        </div>
        <ul className="text-yellow-700 dark:text-yellow-300 font-bold text-sm space-y-1">
          {hints.map((hint, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400">•</span>
              <span>{hint}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  switch (exercise.exercise_type) {
    case 'multiple_choice':
      const mcContent = exercise.content as MultipleChoiceContent;
      return (
        <div className="space-y-4">
          {/* Question with audio option */}
          <div className="bg-blue-50/90 dark:bg-gray-700/90 p-6 border-3 border-blue-300 dark:border-blue-500 shadow-lg"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4 flex-1">
                {mcContent.question}
              </h3>
              <button
                onClick={() => speakText(mcContent.question)}
                className="ml-4 p-2 bg-blue-600 text-white border-2 border-black hover:bg-blue-700 transition-all duration-300 flex items-center space-x-1"
                title="Escuchar pregunta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {mcContent.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerChange(option)}
                disabled={isCompleted}
                className={`w-full p-4 text-left border-3 transition-all duration-300 font-bold ${
                  userAnswer === option
                    ? 'bg-blue-600 text-white border-black dark:border-gray-300 shadow-xl scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300'
                } ${isCompleted ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:scale-102'}`}
                style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(option);
                    }}
                    className="p-1 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
              </button>
            ))}
          </div>

          {renderHints(mcContent.hints)}
        </div>
      );

    case 'fill_blank':
      const fbContent = exercise.content as FillBlankContent;
      return (
        <div className="space-y-4">
          {/* Question */}
          <div className="bg-green-50/90 dark:bg-gray-700/90 p-6 border-3 border-green-300 dark:border-green-500 shadow-lg"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4 flex-1">
                {fbContent.question}
              </h3>
              <button
                onClick={() => speakText(fbContent.question)}
                className="ml-4 p-2 bg-green-600 text-white border-2 border-black hover:bg-green-700 transition-all duration-300"
                title="Escuchar pregunta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="relative">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              disabled={isCompleted}
              className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-green-500 text-lg disabled:opacity-60"
              style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
              placeholder="Escribe la palabra que falta..."
            />
            {fbContent.case_sensitive === false && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400 font-bold">
                No distingue mayúsculas
              </div>
            )}
          </div>

          {renderHints(fbContent.hints)}
        </div>
      );

    case 'translation':
      const trContent = exercise.content as TranslationContent;
      return (
        <div className="space-y-4">
          {/* Source text */}
          <div className="bg-purple-50/90 dark:bg-gray-700/90 p-6 border-3 border-purple-300 dark:border-purple-500 shadow-lg"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                {trContent.source_language.toUpperCase()} → {trContent.target_language.toUpperCase()}
              </span>
              <button
                onClick={() => speakText(trContent.question, trContent.source_language)}
                className="p-2 bg-purple-600 text-white border-2 border-black hover:bg-purple-700 transition-all duration-300"
                title="Escuchar texto original"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
              {trContent.question}
            </h3>
          </div>

          {/* Translation input */}
          <textarea
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={isCompleted}
            className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg disabled:opacity-60 resize-none"
            style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
            placeholder="Escribe tu traducción aquí..."
            rows={3}
          />

          {renderHints(trContent.hints)}
        </div>
      );

    case 'audio':
      const audioContent = exercise.content as AudioContent;
      return (
        <div className="space-y-4">
          {/* Audio player */}
          <div className="bg-orange-50/90 dark:bg-gray-700/90 p-6 border-3 border-orange-300 dark:border-orange-500 shadow-lg text-center"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {audioContent.question}
            </h3>
            
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => playAudio(audioContent.audio_url)}
                className="bg-orange-600 text-white px-6 py-3 font-bold border-3 border-black hover:bg-orange-700 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-lg"
                style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
              >
                <Play className="w-5 h-5" />
                <span>Reproducir Audio</span>
              </button>
              
              {isCompleted && audioContent.transcript && (
                <div className="text-sm text-orange-700 dark:text-orange-300 font-bold">
                  Transcripción: "{audioContent.transcript}"
                </div>
              )}
            </div>
          </div>

          {/* Answer input */}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={isCompleted}
            className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg disabled:opacity-60"
            style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
            placeholder="Escribe lo que escuchaste..."
          />

          {renderHints(audioContent.hints)}
        </div>
      );

    case 'conversation':
      const convContent = exercise.content as ConversationContent;
      return (
        <div className="space-y-4">
          {/* Scenario */}
          <div className="bg-teal-50/90 dark:bg-gray-700/90 p-6 border-3 border-teal-300 dark:border-teal-500 shadow-lg"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <div className="mb-4">
              <span className="text-sm font-bold text-teal-700 dark:text-teal-300 mb-2 block">
                ESCENARIO:
              </span>
              <p className="text-teal-800 dark:text-teal-200 font-bold text-sm mb-4">
                {convContent.scenario}
              </p>
            </div>
            
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 flex-1">
                {convContent.question}
              </h3>
              <button
                onClick={() => speakText(convContent.question)}
                className="ml-4 p-2 bg-teal-600 text-white border-2 border-black hover:bg-teal-700 transition-all duration-300"
                title="Escuchar pregunta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Response input */}
          <textarea
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={isCompleted}
            className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg disabled:opacity-60 resize-none"
            style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
            placeholder="Responde de forma natural..."
            rows={3}
          />

          {/* Expected responses hint */}
          {showHints && convContent.expected_responses && (
            <div className="p-3 bg-teal-50/90 dark:bg-teal-900/30 border-2 border-teal-400 dark:border-teal-500 shadow-md"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <div className="text-teal-800 dark:text-teal-200 font-bold text-sm mb-2">
                💡 Ejemplos de respuestas:
              </div>
              <ul className="text-teal-700 dark:text-teal-300 font-bold text-sm space-y-1">
                {convContent.expected_responses.map((response, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-teal-600 dark:text-teal-400">•</span>
                    <span>{response}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {renderHints(convContent.hints)}
        </div>
      );

    default:
      return (
        <div className="p-6 bg-gray-50/90 dark:bg-gray-700/90 border-3 border-gray-300 dark:border-gray-500 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-bold">
            Tipo de ejercicio no soportado: {exercise.exercise_type}
          </p>
        </div>
      );
  }
}

export default ExerciseRenderer;