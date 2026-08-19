import { useQuiz } from '../hooks/useQuiz';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { ExplanationTabs } from '../components/quiz/ExplanationTabs';
import { DistractorFeedback } from '../components/quiz/DistractorFeedback';
import { MasteryBar } from '../components/quiz/MasteryBar';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { AlertCircle } from 'lucide-react';

export function Quiz({ userId = "mock_user_1" }) {
  const {
    question,
    loading,
    error,
    selectedOption,
    setSelectedOption,
    confidence,
    setConfidence,
    isSubmitted,
    submitLoading,
    feedback,
    mastery,
    submitAnswer,
    loadNextQuestion
  } = useQuiz(userId);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <LoadingState message="Preparing your adaptive quiz..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="p-4 bg-danger-100 text-danger-600 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-3" />
          <p>{error}</p>
        </div>
        <Button onClick={loadNextQuestion} className="mt-4">Try Again</Button>
      </div>
    );
  }

  const currentSubdomainMastery = mastery?.mastery?.[question?.subdomain];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Adaptive Training</h1>
        <p className="text-slate-500 text-sm">Your learning path is adjusting in real-time based on your performance.</p>
      </div>

      {question && (
        <MasteryBar 
          subdomain={question.subdomain} 
          mastery={currentSubdomainMastery} 
        />
      )}

      <QuestionCard 
        question={question}
        selectedOption={selectedOption}
        onOptionSelect={setSelectedOption}
        confidence={confidence}
        setConfidence={setConfidence}
        isSubmitted={isSubmitted}
        isCorrect={feedback?.is_correct}
      />

      {isSubmitted && feedback && (
        <div className="mt-6 animate-fade-in">
          <div className={`p-4 rounded-lg mb-6 font-semibold flex items-center ${
            feedback.is_correct ? 'bg-success-100 text-success-600' : 'bg-danger-100 text-danger-600'
          }`}>
            {feedback.is_correct ? 'Correct! Well done.' : 'Incorrect.'}
          </div>
          
          <DistractorFeedback feedback={feedback.distractor_feedback} />
          
          <ExplanationTabs 
            techExplanation={feedback.explanation_tech}
            simpleExplanation={feedback.explanation_simple}
          />
        </div>
      )}

      <div className="mt-8 flex justify-end">
        {!isSubmitted ? (
          <Button 
            onClick={submitAnswer} 
            disabled={!selectedOption || submitLoading}
            className="w-full sm:w-auto"
          >
            {submitLoading ? 'Submitting...' : 'Submit Answer'}
          </Button>
        ) : (
          <Button 
            onClick={loadNextQuestion}
            className="w-full sm:w-auto"
          >
            Continue to Next Concept
          </Button>
        )}
      </div>
    </div>
  );
}
