import { useState, useEffect } from 'react';
import { getQuizQuestions } from '../api';
import { quizQuestions as defaultQuestions } from '../data/quizData';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, HelpCircle, Wifi, WifiOff } from 'lucide-react';

export default function QuizScreen({ onCompleteQuiz, onNavigate }) {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState(75);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLiveApi, setIsLiveApi] = useState(false);

  // Auto-connects to live backend if available, gracefully uses default 10 questions if offline
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await getQuizQuestions();
        if (res && res.data && res.data.length > 0) {
          setQuestions(res.data);
          setIsLiveApi(res.isLive);
        }
      } catch {
        // Keeps defaultQuestions if backend fails
      }
    }
    loadQuestions();
  }, []);

  const currentQ = questions[currentIndex] || defaultQuestions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correctAnswer;
    const answerRecord = {
      questionId: currentQ.id,
      topic: currentQ.topic,
      isCorrect,
      confidence: confidence / 100
    };

    const updatedAnswers = [...userAnswers, answerRecord];
    setUserAnswers(updatedAnswers);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setConfidence(75);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateAndSubmitMastery(updatedAnswers);
    }
  };

  const calculateAndSubmitMastery = (allAnswers) => {
    const topicScores = {
      phishing: [],
      passwords: [],
      social_engineering: [],
      data_handling: [],
      incident_reporting: []
    };

    allAnswers.forEach((ans) => {
      if (topicScores[ans.topic]) {
        // High confidence correct = high score; High confidence incorrect = strong gap detection
        const score = ans.isCorrect
          ? 0.5 + 0.5 * ans.confidence
          : Math.max(0.05, 0.4 * (1 - ans.confidence));
        topicScores[ans.topic].push(score);
      }
    });

    const finalMastery = {};
    Object.keys(topicScores).forEach((topic) => {
      const arr = topicScores[topic];
      if (arr.length > 0) {
        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
        finalMastery[topic] = parseFloat(avg.toFixed(2));
      } else {
        finalMastery[topic] = 0.50;
      }
    });

    if (onCompleteQuiz) {
      onCompleteQuiz(finalMastery);
    } else if (onNavigate) {
      onNavigate('roadmap');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-bold rounded-full">
            QUESTION {currentIndex + 1} OF {questions.length}
          </span>
          {isLiveApi ? (
            <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <Wifi className="w-3 h-3" /> Live DB
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">
              <WifiOff className="w-3 h-3" /> Offline Set
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-slate-400 font-mono">
          {progressPercent}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md space-y-6 shadow-2xl">
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
            {currentQ.domain || 'Cybersecurity Diagnostic'}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            let buttonStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';

            if (isAnswerSubmitted) {
              if (isSelected && isCorrect) {
                buttonStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50';
              } else if (!isSelected && isCorrect) {
                buttonStyle = 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300';
              } else {
                buttonStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-medium border transition-all duration-200 flex items-center justify-between cursor-pointer ${buttonStyle}`}
              >
                <span>{option}</span>
                <div className="flex-shrink-0 ml-3">
                  {isAnswerSubmitted && isSelected && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                  {isAnswerSubmitted && !isSelected && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/60" />
                  )}
                  {!isAnswerSubmitted && (
                    <div className="w-4 h-4 rounded-full border border-slate-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Confidence Factor Slider */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> CONFIDENCE FACTOR:
            </span>
            <span className="font-mono font-bold text-indigo-400">{confidence}% Certain</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            step="5"
            disabled={isAnswerSubmitted}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-medium">
            <span>50% (Guess)</span>
            <span>100% (High Certainty)</span>
          </div>
        </div>

        {/* Next / Complete Button */}
        {isAnswerSubmitted && (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>{currentIndex + 1 === questions.length ? 'Submit Assessment & Generate Roadmap' : 'Next Question'}</span>
            {currentIndex + 1 === questions.length ? <ShieldCheck className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}