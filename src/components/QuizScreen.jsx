import { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Cpu, 
  ArrowRight, 
  Award, 
  RotateCcw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function QuizScreen({ onQuizComplete, onProceedToRoadmap }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [confidence, setConfidence] = useState(80);
  const [domainRecords, setDomainRecords] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [finalScoresSummary, setFinalScoresSummary] = useState(null);

  const currentQ = quizQuestions[currentIndex] || quizQuestions[0];
  const isCorrect = selectedOption === currentQ.correctAnswer;

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    const topic = currentQ.topic || 'phishing';
    const scoreEarned = isCorrect 
      ? (confidence / 100) 
      : ((100 - confidence) / 100) * 0.35;

    setDomainRecords((prev) => [
      ...prev,
      { topic, score: scoreEarned, isCorrect }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setConfidence(80);
    } else {
      // 1. Calculate aggregated score by domain
      const standardDomains = ['phishing', 'passwords', 'social_engineering', 'data_handling', 'incident_reporting'];
      const calculatedScores = {};

      standardDomains.forEach((domain) => {
        const matchingAttempts = domainRecords.filter((r) => r.topic === domain);
        if (matchingAttempts.length > 0) {
          const avg = matchingAttempts.reduce((acc, curr) => acc + curr.score, 0) / matchingAttempts.length;
          calculatedScores[domain] = parseFloat(avg.toFixed(2));
        } else {
          // Fallback if topic wasn't directly in subset
          calculatedScores[domain] = 0.50;
        }
      });

      // 2. Set local summary view so it renders the overview
      setFinalScoresSummary(calculatedScores);
      setIsQuizCompleted(true);

      // 3. Inform parent App.jsx of final scores
      if (onQuizComplete) {
        onQuizComplete(calculatedScores);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setConfidence(80);
    setDomainRecords([]);
    setIsQuizCompleted(false);
    setFinalScoresSummary(null);
  };

  // ----------------------------------------------------
  // ASSESSMENT SUMMARY / SCORE OVERVIEW SCREEN
  // ----------------------------------------------------
  if (isQuizCompleted && finalScoresSummary) {
    const scoreValues = Object.values(finalScoresSummary);
    const overallScore = Math.round(
      (scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) * 100
    );

    return (
      <div className="max-w-3xl mx-auto my-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Icon & Title */}
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AdaptIQ Calibration Complete</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Diagnostic Assessment Scorecard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Your confidence-weighted responses evaluated workforce threat readiness. Review your domain masteries below.
          </p>
        </div>

        {/* Aggregate Score Card */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-around">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overall Mastery</div>
            <div className={`text-3xl font-extrabold font-mono mt-1 ${overallScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {overallScore}%
            </div>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Questions Evaluated</div>
            <div className="text-3xl font-extrabold font-mono text-white mt-1">
              {quizQuestions.length} / {quizQuestions.length}
            </div>
          </div>
        </div>

        {/* Domain Mastery Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {Object.entries(finalScoresSummary).map(([topic, scoreVal]) => {
            const pct = Math.round(scoreVal * 100);
            const isPassing = pct >= 70;
            const isVulnerable = pct < 50;

            return (
              <div key={topic} className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 capitalize">
                    {topic.replace('_', ' ')}
                  </span>
                  <span className={`font-mono font-bold ${
                    isPassing ? 'text-emerald-400' : isVulnerable ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {pct}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isPassing ? 'bg-emerald-500' : isVulnerable ? 'bg-rose-500' : 'bg-amber-500'
                    }`} 
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="text-[10px] text-slate-400">
                  {isPassing ? 'Baseline Secured' : isVulnerable ? 'Critical Vulnerability' : 'Moderate Competency'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons: Retake vs Proceed to Roadmap */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={restartQuiz}
            className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-bold border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Diagnostic</span>
          </button>

          <button
            onClick={() => onProceedToRoadmap && onProceedToRoadmap()}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 cursor-pointer"
          >
            <span>Proceed to Adaptive Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // QUESTION DISPLAY VIEW
  // ----------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Progress Bar */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
            QUESTION {currentIndex + 1} OF {quizQuestions.length}
          </span>
          <h4 className="text-xs font-bold text-slate-300 capitalize">
            Domain: {(currentQ.topic || 'Security').replace('_', ' ')}
          </h4>
        </div>
        <div className="w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Choice Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let optionStyles = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200';

            if (selectedOption === idx) {
              optionStyles = 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500';
            }

            if (isAnswerSubmitted) {
              if (idx === currentQ.correctAnswer) {
                optionStyles = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 ring-1 ring-emerald-500/30';
              } else if (selectedOption === idx) {
                optionStyles = 'bg-rose-950/40 border-rose-500/60 text-rose-300 ring-1 ring-rose-500/30';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between cursor-pointer ${optionStyles}`}
              >
                <span>{opt}</span>
                {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
                {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Confidence Slider */}
        {!isAnswerSubmitted && (
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Self-Assessed Confidence:</span>
              <span className="font-mono text-indigo-400 font-bold">{confidence}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        )}

        {/* Dual Feedback & Explanations */}
        {isAnswerSubmitted && (
          <div className={`p-5 rounded-2xl border space-y-4 animate-in fade-in duration-200 ${
            isCorrect 
              ? 'bg-emerald-950/20 border-emerald-500/40' 
              : 'bg-rose-950/20 border-rose-500/40'
          }`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              )}
              <h4 className={`text-sm font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCorrect ? 'Correct Assessment' : 'Vulnerability Flagged'}
              </h4>
            </div>

            {/* Simple Takeaway */}
            <div className="space-y-1 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Simple Takeaway:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.simpleExplanation || 'Verify suspicious communications via established secondary channels before executing commands.'}
              </p>
            </div>

            {/* Technical Breakdown */}
            <div className="space-y-1 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technical & Forensics Breakdown:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {currentQ.technicalExplanation || 'Enforce hardware-backed FIDO2 tokens, review RFC 5322 MIME headers, and preserve memory forensics on isolation.'}
              </p>
            </div>
          </div>
        )}

        {/* Footer Submit / Advance Button */}
        <div className="pt-2">
          {!isAnswerSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                selectedOption !== null
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit Response
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm rounded-2xl transition cursor-pointer shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>{currentIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Assessment Scorecard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}