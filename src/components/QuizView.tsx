import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { QuizQuestion } from '../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { currentDailyContent, isLoadingDay, progress, markTaskDone, setActiveTab } = useProgress();
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (isLoadingDay || !currentDailyContent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Generating Today's 5 Quiz Check Questions...
        </p>
      </div>
    );
  }

  const { quiz, day } = currentDailyContent;
  const existingScore = progress.dayProgressMap[day]?.quizScore;
  const isDone = Boolean(progress.dayProgressMap[day]?.quizDone);

  const handleSelectAnswer = (qId: string, answer: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q) => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correct = q.correctAnswer.trim().toLowerCase();
      if (userAns === correct) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const score = calculateScore();
    markTaskDone(day, 'quiz', { score, total: quiz.length });
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const currentScore = calculateScore();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="bento-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
              Day {day} • 10 Min Quiz
            </span>
            <span className="text-xs font-semibold text-zinc-400">
              5 Comprehension Check Questions
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Knowledge Checkpoint
          </h1>
        </div>

        {submitted && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRetry}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1 border border-zinc-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>

            <button
              id="finish-day-btn"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Score Summary Box (when submitted) */}
      {submitted && (
        <div className={`p-6 rounded-2xl border text-center space-y-2 shadow-md ${
          currentScore >= 4
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
            : currentScore >= 3
            ? 'bg-amber-950/80 text-amber-300 border-amber-700'
            : 'bg-zinc-900 text-white border-zinc-700'
        }`}>
          <Trophy className="w-10 h-10 mx-auto animate-bounce text-amber-400" />
          <h2 className="text-2xl font-mono font-extrabold">
            You Scored {currentScore} / {quiz.length} ({Math.round((currentScore / quiz.length) * 100)}%)
          </h2>
          <p className="text-xs sm:text-sm font-medium opacity-90">
            {currentScore >= 4
              ? 'Outstanding performance! You have mastered today\'s software engineering concepts.'
              : 'Good attempt! Review the mentor explanations below for any questions you missed.'}
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.map((q, qIdx) => {
          const userAns = userAnswers[q.id] || '';
          const isCorrect = submitted && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={q.id}
              className={`bento-card transition ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-500/50'
                    : 'border-rose-500/50'
                  : 'border-zinc-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Question {qIdx + 1} of 5 ({q.type.replace('_', ' ')})
                </span>
                {submitted && (
                  isCorrect ? (
                    <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400 font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-xs font-bold text-rose-400 font-mono">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect</span>
                    </span>
                  )
                )}
              </div>

              <h3 className="text-base font-bold text-white mb-4">
                {q.question}
              </h3>

              {/* Options or Input */}
              {q.type === 'multiple_choice' || q.type === 'true_false' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(q.options || ['True', 'False']).map((opt, oIdx) => {
                    const isSelected = userAns === opt;
                    const isOptionCorrect = submitted && opt.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                    return (
                      <button
                        key={oIdx}
                        disabled={submitted}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`text-left p-3.5 rounded-xl text-xs font-semibold transition border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-zinc-950/80 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        } ${
                          submitted && isOptionCorrect
                            ? '!bg-emerald-600 !text-white !border-emerald-500 font-bold'
                            : ''
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  type="text"
                  disabled={submitted}
                  value={userAns}
                  onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {/* Explanation when submitted */}
              {submitted && (
                <div className={`mt-4 p-3.5 rounded-xl text-xs leading-relaxed border ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                }`}>
                  <strong>Mentor Explanation:</strong> {q.explanation} (Correct Answer: <span className="font-mono font-bold">{q.correctAnswer}</span>)
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          id="submit-quiz-btn"
          onClick={handleSubmitQuiz}
          disabled={Object.keys(userAnswers).length < quiz.length}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition shadow-lg disabled:opacity-50"
        >
          Submit Quiz & Check Score ({Object.keys(userAnswers).length} / {quiz.length} Answered)
        </button>
      )}
    </div>
  );
};
