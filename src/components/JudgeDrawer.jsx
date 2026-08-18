import { useState } from 'react';
import { 
  X, 
  Code2, 
  Cpu, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldAlert, 
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function JudgeDrawer({ 
  isOpen, 
  onClose, 
  masteryScores, 
  setMasteryScores,
  currentUser,
  setCurrentUser 
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const liveCalculationPayload = {
    system: "AdaptIQ Adaptive Risk & Decision Engine",
    timestamp: new Date().toISOString(),
    session_user: currentUser,
    bayesian_mastery_vector: masteryScores,
    inferred_domain_vulnerabilities: Object.entries(masteryScores)
      .filter(([, score]) => score < 0.50)
      .map(([domain, score]) => ({
        domain,
        score,
        threat_level: score < 0.35 ? "CRITICAL_GAP" : "MODERATE_RISK",
        mandatory_remediation: true
      })),
    dynamic_skip_logic: {
      bypassed_modules_count: Object.values(masteryScores).filter(s => s >= 0.70).length,
      time_saved_hours_per_user: parseFloat((Object.values(masteryScores).filter(s => s >= 0.70).length * 1.75).toFixed(2))
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(liveCalculationPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Judge Data Drawer</h3>
                <p className="text-xs text-slate-400">Live AI Vector Math & Raw JSON Telemetry</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Active Employee Persona</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Rivaa', role: 'HR Specialist', department: 'Human Resources' },
                { name: 'Marcus Vance', role: 'DevOps Lead', department: 'Cloud Infrastructure' },
                { name: 'Elena Rostova', role: 'Financial Controller', department: 'Corporate Finance' },
                { name: 'Sarah Chen', role: 'Executive Assistant', department: 'Executive Operations' }
              ].map((p) => (
                <button
                  key={p.role}
                  onClick={() => setCurrentUser && setCurrentUser(p)}
                  className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                    currentUser?.role === p.role
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{p.name}</div>
                  <div className="text-[10px] text-indigo-300">{p.role}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Mastery Override (What-If Injector)</span>
            </h4>

            <div className="space-y-2.5">
              {Object.entries(masteryScores).map(([topic, score]) => (
                <div key={topic} className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200 capitalize">
                      {topic.replace('_', ' ')}
                    </span>
                    <span className={`font-mono font-bold ${score < 0.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {Math.round(score * 100)}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={score}
                    onChange={(e) => setMasteryScores(prev => ({ ...prev, [topic]: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />

                  <div className="flex gap-2 pt-0.5">
                    <button
                      onClick={() => setMasteryScores(prev => ({ ...prev, [topic]: 0.25 }))}
                      className="flex-1 py-1 text-[10px] font-bold bg-rose-950/40 border border-rose-500/40 text-rose-300 rounded-lg hover:bg-rose-900/60 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShieldAlert className="w-3 h-3 text-rose-400" />
                      Gap (25%)
                    </button>
                    <button
                      onClick={() => setMasteryScores(prev => ({ ...prev, [topic]: 0.90 }))}
                      className="flex-1 py-1 text-[10px] font-bold bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded-lg hover:bg-emerald-900/60 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      Master (90%)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live AI JSON Payload</span>
              </span>

              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition cursor-pointer border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-[11px] text-cyan-300 max-h-56 overflow-y-auto leading-relaxed shadow-inner">
              <pre>{JSON.stringify(liveCalculationPayload, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            Close & Inspect Live Visuals
          </button>
        </div>

      </div>
    </div>
  );
}
