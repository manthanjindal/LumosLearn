import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { lessonsByTopic } from './Lessons';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface Lesson {
  title: string;
  content: string;
  quiz: QuizQuestion[];
}

const COLORS = {
  background: '#0E0E0E',
  contentBox: '#1A1A1A',
  lessonCard: '#1F1F1F',
  mint: '#A3F7BF',
  lightGrey: '#A0A0A0',
  white: '#FFFFFF',
};

const LessonDetailNew: React.FC = () => {
  const { topic, lessonIndex } = useParams<{ topic: string; lessonIndex: string }>();
  const navigate = useNavigate();
  const idx = parseInt(lessonIndex || '0', 10);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<number[]>([]);
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      if (!topic || !lessonIndex) {
        setLoading(false);
        return;
      }
      
      const lessonTitle = lessonsByTopic[topic]?.[idx];

      if (!lessonTitle) {
        setLesson(null);
        setLoading(false);
        return;
      }

      try {
        const lessonModule = await import(`../data/lessons/${lessonTitle}.json`);
        setLesson(lessonModule);
      } catch (error) {
        console.error("Failed to load lesson:", error);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [topic, lessonIndex, idx]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newSelected = [...selected];
    newSelected[currentQ] = optionIndex;
    setSelected(newSelected);
    setUserAnswer(optionIndex);
  };

  const handleQuizSubmit = () => {
    if (userAnswer !== undefined && lesson?.quiz) {
      const isCorrect = lesson.quiz[currentQ].answer === userAnswer;
      if (isCorrect) {
        toast.success('Correct answer!');
      } else {
        toast.error('Incorrect answer. Try again!');
      }
      
      if (currentQ < lesson.quiz.length - 1) {
        setCurrentQ(currentQ + 1);
        setUserAnswer(undefined);
      } else {
        setIsQuizActive(false);
        toast.success('Quiz completed!');
      }
    }
  };

  if (loading) {
    return <div style={{ color: COLORS.white, textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  if (!lesson) {
    return (
      <div style={{ color: COLORS.white, textAlign: 'center', padding: '50px', fontFamily: "'Nunito', sans-serif" }}>
        <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: '2.5rem', color: COLORS.mint }}>Lesson Not Found</h2>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          The lesson content you are looking for hasn't been created yet or failed to load.
        </p>
        <button
          onClick={() => navigate('/lessons')}
          style={{
            marginTop: '2rem',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: COLORS.mint,
            color: COLORS.background,
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  const handleNextLesson = () => {
    const nextLessonIndex = idx + 1;
    if (topic && nextLessonIndex < lessonsByTopic[topic].length) {
      navigate(`/lessons/${topic}/${nextLessonIndex}`);
    }
  };

  const handlePrevLesson = () => {
    const prevLessonIndex = idx - 1;
    if (prevLessonIndex >= 0) {
      navigate(`/lessons/${topic}/${prevLessonIndex}`);
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.background, color: COLORS.lightGrey, fontFamily: "'Nunito', sans-serif" }} className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 style={{ fontFamily: "'Baloo 2', cursive", color: COLORS.mint }} className="text-4xl font-bold mb-6">{lesson?.title}</h1>
        <div className="prose prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
        
        {lesson?.quiz && lesson.quiz.length > 0 && (
          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: COLORS.contentBox }}>
            <h2 style={{ fontFamily: "'Baloo 2', cursive", color: COLORS.mint }} className="text-3xl font-bold mb-4">Quiz</h2>
            {!isQuizActive ? (
              <button
                onClick={() => setIsQuizActive(true)}
                style={{ backgroundColor: COLORS.mint, color: COLORS.background }}
                className="font-bold py-2 px-6 rounded-lg"
              >
                Start Quiz
              </button>
            ) : (
              <div>
                <h3 className="text-xl mb-4">{lesson.quiz[currentQ].question}</h3>
                <div className="space-y-4">
                  {lesson.quiz[currentQ].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        userAnswer === index ? 'bg-mint-dark' : ''
                      }`}
                      style={{
                        backgroundColor: userAnswer === index ? COLORS.mint : COLORS.lessonCard,
                        color: userAnswer === index ? COLORS.background : COLORS.white
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {userAnswer !== undefined && (
                  <button
                    onClick={handleQuizSubmit}
                    style={{ backgroundColor: COLORS.mint, color: COLORS.background, marginTop: '1.5rem' }}
                    className="font-bold py-2 px-6 rounded-lg"
                  >
                    {currentQ < lesson.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevLesson}
            disabled={idx === 0}
            style={{ backgroundColor: COLORS.lessonCard }}
            className={`font-bold py-2 px-6 rounded-lg ${idx === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextLesson}
            disabled={!topic || idx >= lessonsByTopic[topic].length - 1}
            style={{ backgroundColor: COLORS.lessonCard }}
            className={`font-bold py-2 px-6 rounded-lg ${!topic || idx >= lessonsByTopic[topic].length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailNew; 