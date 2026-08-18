import { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowDown, 
  ShieldAlert, 
  GraduationCap,
  Sliders,
  Sparkles,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const MODULES_CONFIG = [
  {
    topic: 'phishing',
    title: 'Phishing & Email Spoofing Defense',
    summary: 'Inspect sender SMTP headers, verify top-level domains, and quarantine suspicious macro-enabled payloads.',
    courseraTitle: 'Google Cybersecurity: Foundations & Phishing Defense'
  },
  {
    topic: 'passwords',
    title: 'Zero-Trust Access & Hardware MFA',
    summary: 'Enforce hardware-backed FIDO2 / WebAuthn tokens to neutralize Adversary-in-the-Middle (AiTM) proxy attacks.',
    courseraTitle: 'Zero Trust Authentication & Modern Identity Security'
  },
  {
    topic: 'social_engineering',
    title: 'Behavioral Social Defense & Pretexting',
    summary: 'Enforce mandatory out-of-band verification on authority impersonation and stop physical tailgating breaches.',
    courseraTitle: 'Social Engineering & Physical Perimeter Defense'
  },
  {
    topic: 'data_handling',
    title: 'Classified Data Handling & Tokenization',
    summary: 'Sanitize proprietary codebase snippets and protect sensitive PII with AES-256 field-level encryption.',
    courseraTitle: 'Enterprise Data Privacy & PII Compliance Standards'
  },
  {
    topic: 'incident_reporting',
    title: 'Critical Incident Escalation & SOC Forensics',
    summary: 'Sever network interfaces instantly to isolate ransomware traversal while preserving volatile RAM forensics.',
    courseraTitle: 'Incident Response & SOC Forensic Investigation'
  }
];

export default function RoadmapView({ masteryScores = {}, onSimulatePass, onSimulateFail, onNavigate }) {
  const [showJudgeDrawer, setShowJudgeDrawer] = useState(false);

  const handleSimulateModuleFailure = (topic) => {
    if (onSimulateFail) {
      onSimulateFail(topic);
    }
  };

  const handleSimulateModulePass = (topic) => {
    if (onSimulatePass) {
      onSimulatePass(topic);
    }
  };

  const handleProceedToCourses = () => {
    if (onNavigate) {
      onNavigate('weak_areas');
    }
  };

  const scoreValues = Object.values(masteryScores);
  const avgMastery = scoreValues.length > 0
    ? Math.round((scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) * 100)
    : 50;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Overview & Live Judge Drawer Control */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
              Adaptive Pathway Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Aggregate Health: <strong className={avgMastery >= 75 ? 'text-emerald-400' : 'text-amber-400'}>{avgMastery}%</strong>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Dynamic Remediation Roadmap</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Modules adapt dynamically according to diagnostic evaluations. Select any module to view recommended remediation coursework and partner certifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Judge What-If Simulation Trigger */}
          <button
            onClick={() => setShowJudgeDrawer(!showJudgeDrawer)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer border ${
              showJudgeDrawer
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>{showJudgeDrawer ? 'Close What-If Tool' : 'Judge What-If Simulation'}</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('weak_areas')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 rounded-2xl text-xs font-bold transition cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Course Catalog</span>
          </button>
        </div>
      </div>

      {/* Judge What-If Simulation Panel */}
      {showJudgeDrawer && (
        <div className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/30 p-5 rounded-3xl space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Judge Evaluation Mode: Live What-If Scenario Injector
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              Test adaptive rerouting without retaking the diagnostic assessment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {MODULES_CONFIG.map((mod) => {
              const currentScore = masteryScores[mod.topic] ?? 0.50;

              return (
                <div key={mod.topic} className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 truncate pr-2">{mod.title.split('&')[0]}</span>
                    <span className="font-mono text-[11px] text-indigo-400 font-bold">
                      {Math.round(currentScore * 100)}%
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleSimulateModuleFailure(mod.topic)}
                      className="flex-1 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShieldAlert className="w-3 h-3 text-rose-400" />
                      Simulate Gap
                    </button>
                    <button
                      onClick={() => handleSimulateModulePass(mod.topic)}
                      className="flex-1 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      Simulate Pass
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Adaptive Roadmap Pipeline */}
      <div className="space-y-4 relative">
        {MODULES_CONFIG.map((mod, idx) => {
          const score = masteryScores[mod.topic] ?? 0.50;
          const isMastered = score >= 0.80;
          const isVulnerable = score < 0.50;

          return (
            <div key={mod.topic} className="flex flex-col items-center space-y-4">
              <div
                className={`w-full p-5 rounded-3xl border transition-all duration-300 shadow-lg ${
                  isMastered
                    ? 'bg-slate-900/40 border-emerald-500/30 ring-1 ring-emerald-500/20'
                    : isVulnerable
                    ? 'bg-rose-950/20 border-rose-500/40 ring-1 ring-rose-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 font-bold">MODULE 0{idx + 1}</span>
                      {isMastered ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Validated ({Math.round(score * 100)}%)
                        </span>
                      ) : isVulnerable ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                          <ShieldAlert className="w-3 h-3" /> Action Needed ({Math.round(score * 100)}%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" /> In Progress ({Math.round(score * 100)}%)
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-white">{mod.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{mod.summary}</p>
                  </div>

                  {/* Single Clean Course Action */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleProceedToCourses(mod.topic)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md ${
                        isVulnerable
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{isVulnerable ? 'View Remediation Courses' : 'View Recommended Courses'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {idx < MODULES_CONFIG.length - 1 && (
                <ArrowDown className="w-4 h-4 text-slate-700" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}