import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Translation } from '../../types/translations';

interface FAQSectionProps {
  t: Translation;
}

function FAQSection({ t }: FAQSectionProps) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: 'faqQuestion1',
      answer: 'faqAnswer1'
    },
    {
      question: 'faqQuestion2',
      answer: 'faqAnswer2'
    },
    {
      question: 'faqQuestion3',
      answer: 'faqAnswer3'
    },
    {
      question: 'faqQuestion4',
      answer: 'faqAnswer4'
    },
    {
      question: 'faqQuestion5',
      answer: 'faqAnswer5'
    },
    {
      question: 'faqQuestion6',
      answer: 'faqAnswer6'
    },
    {
      question: 'faqQuestion7',
      answer: 'faqAnswer7'
    },
    {
      question: 'faqQuestion8',
      answer: 'faqAnswer8'
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section id="faq" className="py-21 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/3 w-12 h-12 bg-gradient-to-br from-green-800 to-black dark:from-green-600 dark:to-gray-800 transform rotate-45 opacity-25 shadow-xl"></div>
        <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-black dark:bg-gray-300 transform -rotate-45 opacity-35 shadow-lg"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-18">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-7 tracking-tight">
            {t.faqTitle}
          </h2>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-7 max-w-4xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(0% 0%, 97% 0%, 100% 100%, 3% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.faqSubtitle}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-xl transition-all duration-300 ${
                openQuestion === index ? 'transform scale-105' : 'hover:shadow-2xl'
              }`}
              style={{
                clipPath: index % 2 === 0
                  ? 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)'
                  : 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)'
              }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-300"
              >
                <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 pr-4">
                  {t[faq.question as keyof Translation] as string}
                </h3>
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 flex items-center justify-center border-2 border-black dark:border-gray-300 transform rotate-45 shadow-lg">
                  {openQuestion === index ? (
                    <ChevronUp className="w-4 h-4 text-white transform -rotate-45" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white transform -rotate-45" />
                  )}
                </div>
              </button>
              
              {openQuestion === index && (
                <div className="px-6 pb-6">
                  <div className={`bg-green-50/90 dark:bg-gray-700/90 p-5 border-3 border-gray-300 dark:border-gray-500 shadow-md`}
                       style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-bold text-sm">
                      {t[faq.answer as keyof Translation] as string}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;