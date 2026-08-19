import { useState, useEffect, useCallback } from 'react';
import { fetchNextQuiz } from '../api/quizApi';
import { submitAssessment, getMasteryState } from '../api/assessmentApi';

export function useQuiz(userId) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState(0.75);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [feedback, setFeedback] = useState(null);
  const [mastery, setMastery] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const loadNextQuestion = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setIsSubmitted(false);
      setSelectedOption(null);
      setConfidence(0.75);
      setFeedback(null);
      
      const q = await fetchNextQuiz(userId);
      setQuestion(q);
      
      // Also fetch current mastery
      const m = await getMasteryState(userId);
      setMastery(m);
      
    } catch (err) {
      setError(err.message || 'Failed to load the next quiz.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  const submitAnswer = async () => {
    if (!selectedOption || submitLoading || !question) return;
    
    try {
      setSubmitLoading(true);
      
      const attempt = {
        question_id: question.question_id,
        subdomain: question.subdomain,
        difficulty: question.difficulty,
        selected_option: selectedOption,
        confidence: confidence
      };
      
      const result = await submitAssessment(userId, attempt);
      setFeedback(result);
      if (result.updated_mastery) {
        setMastery(result.updated_mastery);
      }
      setIsSubmitted(true);
      
    } catch (err) {
      setError(err.message || 'Failed to submit answer.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
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
  };
}
