import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { QuizQuestion } from '../types';
import { Brain, Award, CheckCircle, XCircle, Sparkles } from 'lucide-react';

export const Quiz = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .limit(6);

    if (!error && data) {
      const shuffled = data.sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
    }
    setLoading(false);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    setAnswers({
      ...answers,
      [currentQuestionIndex]: selectedAnswer
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const finalAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedAnswer
    };

    let score = 0;
    questions.forEach((question, index) => {
      if (finalAnswers[index] === question.correct_answer) {
        score++;
      }
    });

    if (user) {
      const badges = [];
      if (score === questions.length) badges.push('Étoile Parfaite');
      else if (score >= questions.length * 0.8) badges.push('Lune Croissante');
      else if (score >= questions.length * 0.6) badges.push('Constellation');

      await supabase.from('quiz_attempts').insert([
        {
          user_id: user.id,
          quiz_date: new Date().toISOString().split('T')[0],
          score: score,
          total_questions: questions.length,
          badges_earned: badges
        }
      ]);
    }

    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
    fetchQuestions();
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-rose-200 text-xl">Chargement...</div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="w-full min-h-screen px-4 py-12 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-rose-100 mb-4">Quiz de Connaissance</h1>
          <p className="text-purple-200 text-lg mb-8">
            Testez vos connaissances en astronomie islamique, géographie et sciences spatiales
          </p>
          <div className="bg-purple-500/20 rounded-xl p-6 mb-8 border border-purple-400/30">
            <p className="text-purple-200 mb-2">
              <strong>{questions.length}</strong> questions vous attendent
            </p>
            <p className="text-purple-300/70 text-sm">
              Gagnez des badges selon votre score !
            </p>
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all"
          >
            Commencer le Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="w-full min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-12 text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 mb-6">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-rose-100 mb-4">Quiz Terminé !</h2>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400 mb-4">
              {score}/{questions.length}
            </div>
            <p className="text-2xl text-purple-200 mb-8">
              {percentage === 100
                ? "Parfait ! Vous êtes une étoile brillante !"
                : percentage >= 80
                ? "Excellent ! Vous maîtrisez le sujet !"
                : percentage >= 60
                ? "Bien joué ! Continuez à apprendre !"
                : "Continuez à explorer, la connaissance est un voyage !"}
            </p>

            {percentage >= 60 && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 rounded-full border border-purple-400/30">
                <Sparkles className="w-5 h-5 text-rose-300" />
                <span className="text-purple-200 font-medium">
                  {percentage === 100 ? "Badge: Étoile Parfaite" : percentage >= 80 ? "Badge: Lune Croissante" : "Badge: Constellation"}
                </span>
              </div>
            )}

            <button
              onClick={resetQuiz}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white rounded-lg font-semibold shadow-lg shadow-rose-500/30 transition-all"
            >
              Recommencer
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-rose-100 mb-6">Révision des réponses</h3>
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correct_answer;

              return (
                <div
                  key={question.id}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-xl p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-lg text-rose-100 font-medium mb-3">
                        {index + 1}. {question.question}
                      </p>

                      {!isCorrect && (
                        <div className="bg-rose-500/20 rounded-lg p-3 mb-3 border border-rose-400/30">
                          <p className="text-rose-200 text-sm">
                            Votre réponse : <strong>{userAnswer}</strong>
                          </p>
                        </div>
                      )}

                      <div className="bg-green-500/20 rounded-lg p-3 mb-3 border border-green-400/30">
                        <p className="text-green-200 text-sm">
                          Bonne réponse : <strong>{question.correct_answer}</strong>
                        </p>
                      </div>

                      {question.explanation && (
                        <p className="text-purple-200 text-sm mt-3 italic">
                          💡 {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-200 text-sm">
              Question {currentQuestionIndex + 1} sur {questions.length}
            </span>
            <span className="text-purple-200 text-sm capitalize">
              {currentQuestion.difficulty}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-8">
          <div className="mb-2 text-sm text-purple-300 capitalize">
            {currentQuestion.category}
          </div>

          <h2 className="text-2xl font-semibold text-rose-100 mb-8">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3 mb-8">
            {JSON.parse(currentQuestion.options as unknown as string).map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all border-2 ${
                  selectedAnswer === option
                    ? 'bg-rose-500/30 border-rose-400/50 text-rose-100'
                    : 'bg-white/5 border-purple-400/30 text-purple-200 hover:bg-white/10 hover:border-purple-400/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg shadow-rose-500/30 transition-all"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Question Suivante' : 'Terminer'}
          </button>
        </div>
      </div>
    </div>
  );
};
