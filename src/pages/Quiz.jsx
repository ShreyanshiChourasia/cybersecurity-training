import { useQuiz } from '../hooks/useQuiz';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { ExplanationTabs } from '../components/quiz/ExplanationTabs';
import { DistractorFeedback } from '../components/quiz/DistractorFeedback';
import { MasteryBar } from '../components/quiz/MasteryBar';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { AlertCircle, Crosshair, ArrowRight } from 'lucide-react';

export function Quiz({ userId = "mock_user_1" }) {
  const {
    question, loading, error, selectedOption, setSelectedOption,
    confidence, setConfidence, isSubmitted, submitLoading,
    feedback, mastery, submitAnswer, loadNextQuestion
  } = useQuiz(userId);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-6">
        <LoadingState message="Preparing your adaptive quiz..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="card p-5 bg-danger-50 text-danger-600 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
        <Button onClick={loadNextQuestion} className="mt-4">Try Again</Button>
      </div>
    );
  }

  const currentSubdomainMastery = mastery?.mastery?.[question?.subdomain];

  return (
    <div className="max-w-2xl mx-auto py-8 px-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 animate-slide-right">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
          <Crosshair className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Adaptive Assessment</h1>
          <p className="text-sm text-slate-500">Your path adjusts in real-time based on performance.</p>
        </div>
      </div>

      {question && (
        <div className="animate-slide-up">
          <MasteryBar subdomain={question.subdomain} mastery={currentSubdomainMastery} />
        </div>
      )}

      <div className="animate-scale-in">
        <QuestionCard 
          question={question}
          selectedOption={selectedOption}
          onOptionSelect={setSelectedOption}
          confidence={confidence}
          setConfidence={setConfidence}
          isSubmitted={isSubmitted}
          isCorrect={feedback?.is_correct}
        />
      </div>

      {isSubmitted && feedback && (
        <div className="space-y-4 animate-slide-up">
          <div className={`card p-4 font-semibold text-sm flex items-center gap-3 ${
            feedback.is_correct 
              ? 'bg-success-50 text-success-600 border-success-500/20' 
              : 'bg-danger-50 text-danger-600 border-danger-500/20'
          }`}>
            {feedback.is_correct ? '✓ Correct! Well done.' : '✕ Incorrect. Let\'s review.'}
          </div>
          <DistractorFeedback feedback={feedback.distractor_feedback} />
          <ExplanationTabs 
            techExplanation={feedback.explanation_tech}
            simpleExplanation={feedback.explanation_simple}
          />
        </div>
      )}

      <div className="flex justify-end pt-2">
        {!isSubmitted ? (
          <Button onClick={submitAnswer} disabled={!selectedOption || submitLoading} className="flex items-center gap-2">
            {submitLoading ? 'Analyzing...' : 'Submit Answer'} <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={loadNextQuestion} className="flex items-center gap-2">
            Next Question <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
