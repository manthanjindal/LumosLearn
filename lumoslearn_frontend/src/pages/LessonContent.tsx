// Deprecated: No longer used, replaced by frontend-only LessonDetail.

// Mint and greys
const COLORS = {
  background: '#0E0E0E',
  contentBox: '#1A1A1A',
  mint: '#A3F7BF',
  lightGrey: '#A0A0A0',
  white: '#FFFFFF',
};

interface QuizQuestion {
  question: {
    primary: string;
    secondary: string;
  };
  type: 'multiple_choice' | 'true_false';
  options: Array<{
    text: {
      primary: string;
      secondary: string;
    };
    isCorrect: boolean;
  }>;
  explanation: {
    primary: string;
    secondary: string;
  };
}

interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;
  xpReward: number;
  timeLimit: number;
}

interface Lesson {
  _id: string;
  title: {
    primary: string;
    secondary: string;
  };
  content: {
    primary: string;
    secondary: string;
  };
  difficulty: string;
  xpReward: number;
  estimatedDuration: number;
  quiz: Quiz;
}

const LessonContent: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get<Lesson>(`http://localhost:5000/api/lessons/${lessonId}`);
        setLesson(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Failed to load lesson. Please try again later.');
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setQuizScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (lesson?.quiz.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = selectedAnswers.filter((answer, index) => {
        const question = lesson?.quiz.questions[index];
        return question?.options[answer]?.isCorrect;
      }).length;

      const score = (correctAnswers / (lesson?.quiz.questions.length || 1)) * 100;
      setQuizScore(score);
      setQuizCompleted(true);
    }
  };

  if (loading) {
    return (
      <div style={{ background: COLORS.background, minHeight: '100vh', padding: '2rem', color: COLORS.white }}>
        Loading lesson...
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div style={{ background: COLORS.background, minHeight: '100vh', padding: '2rem', color: COLORS.white }}>
        {error || 'Lesson not found'}
      </div>
    );
  }

  if (showQuiz) {
    const question = lesson.quiz.questions[currentQuestion];
    return (
      <div style={{ background: COLORS.background, minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => setShowQuiz(false)}
              style={{
                background: 'none',
                border: 'none',
                color: COLORS.mint,
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: 0,
              }}
            >
              ← {t('lesson.backToContent')}
            </button>
          </div>

          {quizCompleted ? (
            <div
              style={{
                background: COLORS.contentBox,
                borderRadius: 20,
                padding: '2rem',
                color: COLORS.white,
              }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {t('quiz.completed')}
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                {t('quiz.score')}: {quizScore.toFixed(1)}%
              </p>
              {quizScore >= lesson.quiz.passingScore ? (
                <div style={{ color: COLORS.mint }}>
                  <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                    {t('quiz.congratulations')}!
                  </p>
                  <p>
                    {t('quiz.xpEarned')}: {lesson.quiz.xpReward} XP
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ color: COLORS.lightGrey, marginBottom: '1rem' }}>
                    {t('quiz.tryAgain')}
                  </p>
                  <button
                    onClick={handleStartQuiz}
                    style={{
                      background: COLORS.mint,
                      color: COLORS.background,
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.7rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {t('quiz.restart')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                background: COLORS.contentBox,
                borderRadius: 20,
                padding: '2rem',
                color: COLORS.white,
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: COLORS.lightGrey }}>
                  {t('quiz.question')} {currentQuestion + 1} / {lesson.quiz.questions.length}
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                {language === 'en' ? question.question.primary : question.question.secondary}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    style={{
                      background: selectedAnswers[currentQuestion] === index ? COLORS.mint : 'transparent',
                      color: selectedAnswers[currentQuestion] === index ? COLORS.background : COLORS.white,
                      border: `1.5px solid ${selectedAnswers[currentQuestion] === index ? COLORS.mint : COLORS.lightGrey}`,
                      borderRadius: 8,
                      padding: '1rem',
                      textAlign: 'left',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {language === 'en' ? option.text.primary : option.text.secondary}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                style={{
                  background: selectedAnswers[currentQuestion] !== undefined ? COLORS.mint : COLORS.lightGrey,
                  color: COLORS.background,
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.7rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: selectedAnswers[currentQuestion] !== undefined ? 'pointer' : 'not-allowed',
                  opacity: selectedAnswers[currentQuestion] !== undefined ? 1 : 0.5,
                }}
              >
                {currentQuestion < lesson.quiz.questions.length - 1
                  ? t('quiz.nextQuestion')
                  : t('quiz.finish')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/lessons')}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.mint,
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 0,
            }}
          >
            ← {t('lesson.backToLessons')}
          </button>
        </div>

        <div
          style={{
            background: COLORS.contentBox,
            borderRadius: 20,
            padding: '2rem',
            color: COLORS.white,
            marginBottom: '2rem',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {language === 'en' ? lesson.title.primary : lesson.title.secondary}
          </h1>

          <div style={{ color: COLORS.lightGrey, marginBottom: '2rem' }}>
            <span style={{ marginRight: '1rem' }}>
              {t('lesson.difficulty')}: {t(`difficulty.${lesson.difficulty}`)}
            </span>
            <span style={{ marginRight: '1rem' }}>
              {t('lesson.duration')}: {lesson.estimatedDuration} min
            </span>
            <span>
              {t('lesson.xp')}: {lesson.xpReward}
            </span>
          </div>

          <div style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            {(language === 'en' ? lesson.content.primary : lesson.content.secondary)
              .split('\n\n')
              .map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1.5rem' }}>
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        <button
          onClick={handleStartQuiz}
          style={{
            background: COLORS.mint,
            color: COLORS.background,
            border: 'none',
            borderRadius: 8,
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          {t('lesson.startQuiz')}
        </button>
      </div>
    </div>
  );
};

export default LessonContent; 