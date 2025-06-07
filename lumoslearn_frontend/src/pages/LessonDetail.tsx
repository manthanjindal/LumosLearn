import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { lessonsByTopic } from './Lessons';
import { useLanguage } from '../contexts/LanguageContext';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface Lesson {
  title: string;
  content: string;
  quiz: QuizQuestion[];
  title_hi?: string;
  content_hi?: string;
  quiz_hi?: {
    question: string;
    options: string[];
    answer: number;
  }[];
}

const LessonDetail: React.FC = () => {
  const { topic, lessonIndex } = useParams<{ topic: string; lessonIndex: string }>();
  const navigate = useNavigate();
  const idx = parseInt(lessonIndex || '0', 10);
  const { t, language } = useLanguage();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<number[]>([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      setLesson(null);
      if (!topic || lessonIndex === undefined) {
        setLoading(false);
        return;
      }
      
      const lessonTitle = (lessonsByTopic as { [key: string]: string[] })[topic]?.[idx];

      if (!lessonTitle) {
        setLoading(false);
        return;
      }

      const sanitizedTitle = lessonTitle.replace(/[?:]/g, '').replace(/[/\\*."<>|]/g, '-');

      try {
        const lessonModule = await import(`../data/lessons/${sanitizedTitle}.json`);
        setLesson(lessonModule);
      } catch (error) {
        console.error("Failed to load lesson:", lessonTitle, error);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [topic, lessonIndex, idx]);

  useEffect(() => {
    // Reset quiz state only when the lesson changes
    restartQuiz(true); // pass true to indicate a full reset, not a retry
  }, [topic, lessonIndex]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newSelected = [...selected];
    newSelected[currentQ] = optionIndex;
    setSelected(newSelected);
    setUserAnswer(optionIndex);
  };

  const handleQuizSubmit = () => {
    const currentQuiz = language === 'hi' && lesson?.quiz_hi ? lesson.quiz_hi : lesson?.quiz;
    if (userAnswer !== undefined && currentQuiz) {
      const isCorrect = currentQuiz[currentQ].answer === userAnswer;
      if (isCorrect) {
        toast.success(t('lesson.quiz.correct'));
      } else {
        toast.error(t('lesson.quiz.incorrect'));
      }
      
      if (currentQ < currentQuiz.length - 1) {
        setCurrentQ(currentQ + 1);
        setUserAnswer(undefined);
      } else {
        // End of quiz
        let score = 0;
        const incorrect: number[] = [];
        for (let i = 0; i < currentQuiz.length; i++) {
          if (currentQuiz[i].answer === selected[i]) {
            score++;
          } else {
            incorrect.push(i);
          }
        }
        setQuizScore(score);
        setIncorrectAnswers(incorrect);
        setQuizCompleted(true);
        setIsQuizActive(false);
        toast.info(t('lesson.quiz.completed'));
      }
    }
  };

  const restartQuiz = (isNewLesson: boolean = false) => {
    if (isNewLesson) {
      setIsQuizActive(false);
    } else {
      setIsQuizActive(true);
    }
    setQuizCompleted(false);
    setCurrentQ(0);
    setSelected([]);
    setUserAnswer(undefined);
    setQuizScore(0);
    setIncorrectAnswers([]);
  };

  if (loading) {
    return <div className="bg-[#0D1117] text-white text-center p-12">{t('lesson.loading')}</div>;
  }

  if (!lesson) {
    return (
      <div className="bg-[#0D1117] text-white text-center p-12">
        <h2 className="text-4xl font-bold text-[#38BDF8] mb-4">{t('lesson.notFound.title')}</h2>
        <p className="text-lg mt-4">{t('lesson.notFound.description')}</p>
        <button
          onClick={() => navigate('/lessons')}
          className="mt-8 px-6 py-2 bg-gradient-to-r from-[#34D399] to-[#38BDF8] text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          {t('lesson.notFound.backButton')}
        </button>
      </div>
    );
  }

  const handleNextLesson = () => {
    if (topic && (lessonsByTopic as { [key: string]: string[] })[topic]) {
      const nextLessonIndex = idx + 1;
      if (nextLessonIndex < (lessonsByTopic as { [key: string]: string[] })[topic].length) {
        navigate(`/lessons/${topic}/${nextLessonIndex}`);
      }
    }
  };

  const handlePrevLesson = () => {
    const prevLessonIndex = idx - 1;
    if (prevLessonIndex >= 0) {
      navigate(`/lessons/${topic}/${prevLessonIndex}`);
    }
  };

  const displayTitle = language === 'hi' && lesson.title_hi ? lesson.title_hi : lesson.title;
  const displayContent = language === 'hi' && lesson.content_hi ? lesson.content_hi : lesson.content || '';
  const displayQuiz = language === 'hi' && lesson.quiz_hi ? lesson.quiz_hi : lesson.quiz;

  return (
    <div className="bg-[#0D1117] text-gray-300 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] to-[#34D399]">
          {displayTitle}
        </h1>
        <div className="prose prose-invert max-w-none mb-12 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: displayContent }} />
        
        {displayQuiz && displayQuiz.length > 0 && (
          <div className="mt-12 p-8 bg-gray-800/30 rounded-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">{t('lesson.quiz.title')}</h2>
            
            {quizCompleted ? (
              <div>
                <h3 className="text-2xl text-white mb-4">
                  {t('lesson.quiz.resultTitle')}
                </h3>
                <p className="text-xl mb-6">
                  {t('lesson.quiz.score').replace('{score}', String(quizScore)).replace('{total}', String(displayQuiz.length))}
                </p>

                {incorrectAnswers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-2">{t('lesson.quiz.reviewTitle')}</h4>
                    <ul>
                      {incorrectAnswers.map((qIndex) => (
                        <li key={qIndex} className="mb-4 p-4 bg-gray-700/50 rounded-lg">
                          <p className="font-semibold">{displayQuiz[qIndex].question}</p>
                          <p className="text-green-400 mt-2">
                            {t('lesson.quiz.correctAnswer')}: {displayQuiz[qIndex].options[displayQuiz[qIndex].answer]}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <button
                  onClick={() => restartQuiz()}
                  className="px-8 py-3 bg-gradient-to-r from-[#38BDF8] to-[#34D399] text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                  {t('lesson.quiz.tryAgain')}
                </button>
              </div>
            ) : !isQuizActive ? (
              <button
                onClick={() => setIsQuizActive(true)}
                className="px-8 py-3 bg-gradient-to-r from-[#34D399] to-[#38BDF8] text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
              >
                {t('lesson.quiz.start')}
              </button>
            ) : (
              <div>
                <h3 className="text-xl text-white mb-6">{displayQuiz[currentQ].question}</h3>
                <div className="space-y-4">
                  {displayQuiz[currentQ].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                        userAnswer === index
                          ? 'bg-[#38BDF8] border-[#38BDF8] text-white font-bold'
                          : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {userAnswer !== undefined && (
                  <button
                    onClick={handleQuizSubmit}
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-[#34D399] to-[#38BDF8] text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
                  >
                    {currentQ < displayQuiz.length - 1 ? t('lesson.quiz.next') : t('lesson.quiz.finish')}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-12 flex justify-between">
          <button
            onClick={handlePrevLesson}
            disabled={idx === 0}
            className="px-6 py-2 bg-gray-800/50 text-white font-bold rounded-lg shadow-md hover:bg-gray-700/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('lesson.previous')}
          </button>
          <button
            onClick={handleNextLesson}
            disabled={!topic || !(lessonsByTopic as { [key: string]: string[] })[topic] || idx >= (lessonsByTopic as { [key: string]: string[] })[topic].length - 1}
            className="px-6 py-2 bg-gray-800/50 text-white font-bold rounded-lg shadow-md hover:bg-gray-700/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('lesson.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;