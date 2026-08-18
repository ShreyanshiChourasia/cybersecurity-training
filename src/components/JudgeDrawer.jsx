import { X, Cpu, Activity } from 'lucide-react';

export default function JudgeDrawer({ isOpen, onClose, selectedOption, confidence = 50, currentQuestionIndex = 0 }) {
  if (!isOpen) return null;

  const isSelected = selectedOption !== null;
  const isCorrect = selectedOption === 0;

  const priorKnowledge = (0.45 + (currentQuestionIndex * 0.12)).toFixed(2);
  const guessProbability = (0.25 - (confidence / 500)).toFixed(2);
  const slipProbability = (0.05 + ((100 - confidence) / 1000)).toFixed(2);
  
  let posteriorMastery = 0.50;
  if (isSelected) {
    if (isCorrect) {
      posteriorMastery = ((priorKnowledge * (1 - slipProbability)) / 
        (priorKnowledge * (1 - slipProbability) + (1 - priorKnowledge) * guessProbability)).toFixed(3);
    } else {
      posteriorMastery = ((priorKnowledge * slipProbability) / 
        (priorKnowledge * slipProbability + (1 - priorKnowledge) * (1 - guessProbability))).toFixed(3);
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-slate-950/95 border-l border-slate-800 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-sm tracking-wide">Judge Telemetry Engine</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-3 mb-4 leading-relaxed">
          Real-time Bayesian Knowledge Tracing (BKT) adapting live to selected choices and confidence ratings:
        </p>

        <div className="space-y-3 font-mono">
          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[11px] text-slate-400">P(L) • Prior Knowledge</div>
            <div className="text-xl font-bold text-cyan-400">{priorKnowledge}</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[11px] text-slate-400">P(G) • Dynamic Guess Probability</div>
            <div className="text-xl font-bold text-rose-400">{guessProbability}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Scales inversely with confidence ({confidence}%)</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[11px] text-slate-400">P(S) • Slip Probability</div>
            <div className="text-xl font-bold text-amber-400">{slipProbability}</div>
          </div>

          <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/40 p-3.5 rounded-xl">
            <div className="text-[11px] text-indigo-300 font-sans font-semibold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> P(L|Obs) • Real-time Posterior Mastery
            </div>
            <div className="text-2xl font-bold text-indigo-400 mt-1">
              {isSelected ? posteriorMastery : 'Awaiting Selection...'}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        ⚡ Formula: P(Lt) = P(Lt-1|Obs) + (1 - P(Lt-1|Obs)) * P(T)
      </div>
    </div>
  );
}