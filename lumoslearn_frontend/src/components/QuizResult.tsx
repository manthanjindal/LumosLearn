import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type TranslationFunction = ReturnType<typeof useLanguage>['t'];

interface QuizResultProps {
  score: number;
  total: number;
  incorrectAnswers: {
    question: string;
    correctAnswer: string;
  }[];
  onRetry: () => void;
  t: TranslationFunction;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, total, incorrectAnswers, onRetry, t }) => {
  return (
    <div>
      <h3 className="text-2xl text-white mb-4">{t('lesson.quiz.resultTitle')}</h3>
      <p className="text-xl mb-6">
        {t('lesson.quiz.score').replace('{score}', String(score)).replace('{total}', String(total))}
      </p>
      {incorrectAnswers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-bold text-white mb-2">{t('lesson.quiz.reviewTitle')}</h4>
          <ul>
            {incorrectAnswers.map((item, index) => (
              <li key={index} className="mb-4 p-4 bg-gray-700/50 rounded-lg">
                <p className="font-semibold">{item.question}</p>
                <p className="text-green-400 mt-2">
                  {t('lesson.quiz.correctAnswer')}: {item.correctAnswer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={onRetry}
        className="px-8 py-3 bg-gradient-to-r from-[#38BDF8] to-[#34D399] text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
      >
        {t('lesson.quiz.tryAgain')}
      </button>
    </div>
  );
};

export default QuizResult; 