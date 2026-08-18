import { 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap
} from 'lucide-react';

const MODULES_CONFIG = [
  { id: 'phishing', label: 'Phishing Awareness', desc: 'Email spoofing & payload defense' },
  { id: 'passwords', label: 'Password Hygiene', desc: 'FIDO2 & zero-trust MFA' },
  { id: 'social_engineering', label: 'Social Engineering', desc: 'Pretexting & tailgating defense' },
  { id: 'data_handling', label: 'Data Handling', desc: 'PII tokenization & AI policies' },
  { id: 'incident_reporting', label: 'Incident Reporting', desc: 'Ransomware isolation & SOC alert' }
];

export default function RoadmapView({ masteryScores = {}, onNavigate }) {
  const weakDomains = Object.entries(masteryScores).filter(([, score]) => score < 0.50);
  const masteredDomains = Object.entries(masteryScores).filter(([, score]) => score >= 0.70);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
              Screen 2: Dynamic Pathing
            </span>
            <span className="text-xs text-slate-400 font-mono">Step-by-Step Security Tree</span>
          </div>
          <h2 className="text-xl font-bold text-white">Adaptive Learning Roadmap</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Modules auto-reorder and lock/unlock based on your diagnostic assessment. Mastered topics are bypassed to save training hours.
          </p>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('weak_areas')}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-indigo-600/30 cursor-pointer flex-shrink-0"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Remediate Gaps in Courses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase text-slate-400 font-bold">Tested Out (Skipped)</div>
            <div className="text-lg font-mono font-bold text-emerald-400">{masteredDomains.length} Modules</div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-500/50" />
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase text-slate-400 font-bold">Remediation Required</div>
            <div className="text-lg font-mono font-bold text-rose-400">{weakDomains.length} Modules</div>
          </div>
          <ShieldAlert className="w-6 h-6 text-rose-500/50" />
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase text-slate-400 font-bold">Efficiency Saved</div>
            <div className="text-lg font-mono font-bold text-indigo-400">
              {(masteredDomains.length * 1.75).toFixed(1)} hrs saved
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-indigo-500/50" />
        </div>
      </div>

      <div className="space-y-4 relative">
        {MODULES_CONFIG.map((mod, index) => {
          const score = masteryScores[mod.id] ?? 0.50;
          const isMastered = score >= 0.70;
          const isVulnerable = score < 0.50;

          return (
            <div
              key={mod.id}
              className={`p-5 rounded-3xl border transition-all relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg ${
                isVulnerable
                  ? 'bg-slate-900/90 border-rose-500/40 ring-1 ring-rose-500/20'
                  : isMastered
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-80'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-sm border flex-shrink-0 ${
                  isVulnerable 
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                    : isMastered 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                }`}>
                  0{index + 1}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{mod.label}</h3>
                    {isVulnerable && (
                      <span className="text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Priority Gap
                      </span>
                    )}
                    {isMastered && (
                      <span className="text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Bypassed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{mod.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Mastery Level</div>
                  <div className={`text-sm font-mono font-bold ${
                    isMastered ? 'text-emerald-400' : isVulnerable ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {Math.round(score * 100)}%
                  </div>
                </div>

                {isVulnerable ? (
                  <button
                    onClick={() => onNavigate && onNavigate('weak_areas')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                  >
                    <span>Fix Gap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="px-3 py-2 bg-slate-950/60 border border-slate-800 text-slate-400 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={() => onNavigate && onNavigate('weak_areas')}
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 cursor-pointer"
        >
          <span>Step 3: Proceed to Targeted Upskilling Courses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
