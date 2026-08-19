import { useState, useEffect } from 'react';
import { 
  Shield, ShieldCheck, BrainCircuit, Target, BookOpen, 
  RotateCw, Zap, ArrowRight, Layers, CheckCircle2, 
  TrendingUp, Users, Clock, Award, BarChart3,
  Lock, FileText, AlertTriangle, Eye, ChevronRight,
  Sparkles, Activity
} from 'lucide-react';

export default function LandingPage({ setActiveTab, onOpenDrawer, onOpenAITutor }) {
  const [activeStep, setActiveStep] = useState(1);
  const [animatedStats, setAnimatedStats] = useState({ hours: 0, employees: 0, accuracy: 0, reduction: 0 });

  useEffect(() => {
    const targets = { hours: 4.5, employees: 500, accuracy: 94, reduction: 67 };
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedStats({
        hours: +(targets.hours * ease).toFixed(1),
        employees: Math.round(targets.employees * ease),
        accuracy: Math.round(targets.accuracy * ease),
        reduction: Math.round(targets.reduction * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const workflowSteps = [
    {
      step: 1, title: "Adaptive Assessment", subtitle: "Diagnostic Quiz Engine",
      icon: Target, color: "primary",
      description: "Employees take scenario-based cybersecurity quizzes calibrated to their role. Each question measures both correctness and self-reported confidence (0-100%).",
      metrics: ["Response accuracy tracking", "Confidence calibration scoring", "Real-time difficulty adjustment"],
    },
    {
      step: 2, title: "Knowledge Tracing", subtitle: "Bayesian Estimation",
      icon: BrainCircuit, color: "indigo",
      description: "Our BKT engine updates mastery probability P(L_t) dynamically per sub-domain using Bayes' theorem, accurately modeling slips and lucky guesses.",
      metrics: ["P(L_t) = P(L_{t-1})·(1-P(S)) / denominator", "Slip rate calibration P(S)=0.05", "Guess rate calibration P(G)=0.15"],
    },
    {
      step: 3, title: "Gap Analysis", subtitle: "Weakness Identification",
      icon: AlertTriangle, color: "orange",
      description: "Pinpoints exact sub-domains where the learner falls below enterprise proficiency thresholds, identifying specific misconception patterns.",
      metrics: ["Sub-domain gap detection", "Prerequisite dependency mapping", "Proficiency threshold: 80%"],
    },
    {
      step: 4, title: "Micro-Learning", subtitle: "Targeted Remediation",
      icon: BookOpen, color: "emerald",
      description: "Generates personalized 10-15 minute micro-learning modules matched to flagged weak topics via content-based similarity scoring.",
      metrics: ["Cosine similarity matching", "Bite-sized course delivery", "4.5+ hours saved per employee"],
    },
    {
      step: 5, title: "Continuous Loop", subtitle: "Re-Assessment Cycle",
      icon: RotateCw, color: "violet",
      description: "Dynamically generates the next assessment round, re-testing previously failed concepts while intelligently skipping mastered domains.",
      metrics: ["Adaptive question generation", "Mastery verification loop", "Target: >85% across all domains"],
    }
  ];

  const features = [
    { icon: Shield, title: "5 Cyber Verticals", desc: "Phishing, Password Hygiene, Social Engineering, Data Handling, Incident Reporting", color: "bg-primary-50 text-primary-600" },
    { icon: BrainCircuit, title: "Bayesian AI Engine", desc: "Probabilistic mastery estimation with slip and guess calibration", color: "bg-indigo-50 text-indigo-600" },
    { icon: Clock, title: "4.5 Hrs Saved", desc: "Per employee through adaptive skipping of mastered content", color: "bg-emerald-50 text-emerald-600" },
    { icon: Eye, title: "Dual Explainability", desc: "Technical and Simple explanations powered by AI for every concept", color: "bg-violet-50 text-violet-600" },
    { icon: BarChart3, title: "5-Axis Skill Radar", desc: "Real-time team competency visualization across all domains", color: "bg-amber-50 text-amber-600" },
    { icon: TrendingUp, title: "ROI Forecasting", desc: "Live calculation of training cost savings and productivity gains", color: "bg-rose-50 text-rose-600" },
  ];

  const colorMap = {
    primary: { bg: 'bg-primary-50', text: 'text-primary-600', border: 'border-primary-200', ring: 'ring-primary-500' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', ring: 'ring-indigo-500' },
    orange: { bg: 'bg-accent-50', text: 'text-accent-600', border: 'border-accent-100', ring: 'ring-accent-500' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', ring: 'ring-emerald-500' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', ring: 'ring-violet-500' },
  };

  return (
    <div className="space-y-8 py-8 px-6 lg:px-10 max-w-7xl">

      {/* ── Hero Section ── */}
      <section className="relative card p-8 lg:p-12 overflow-hidden" style={{animationDelay: '0.1s'}}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="badge-blue"><Sparkles className="w-3 h-3 mr-1" />AI-Powered Platform</span>
              <span className="badge-green"><CheckCircle2 className="w-3 h-3 mr-1" />Production Ready</span>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Adaptive Cybersecurity
              <span className="block text-primary-600">Training Platform</span>
            </h1>
            
            <p className="text-base lg:text-lg text-slate-500 leading-relaxed max-w-xl">
              Replace static, one-size-fits-all compliance training with an intelligent system that 
              <strong className="text-slate-700"> identifies real skill gaps</strong>, delivers 
              <strong className="text-slate-700"> targeted micro-learning</strong>, and 
              <strong className="text-slate-700"> continuously adapts</strong> to each employee's knowledge level.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => setActiveTab('quiz')} className="btn-primary flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" /> Start Assessment <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveTab('roadmap')} className="btn-secondary flex items-center gap-2 text-sm">
                <Layers className="w-4 h-4" /> View Skill Tree
              </button>
              <button onClick={() => setActiveTab('analytics')} className="btn-secondary flex items-center gap-2 text-sm">
                <BarChart3 className="w-4 h-4" /> Analytics Dashboard
              </button>
            </div>
          </div>

          {/* Animated Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-[320px]">
            <div className="stat-card items-center text-center animate-slide-up" style={{animationDelay:'0.2s'}}>
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900">{animatedStats.hours}hrs</span>
              <span className="text-xs text-slate-500 font-medium">Saved Per Employee</span>
            </div>
            <div className="stat-card items-center text-center animate-slide-up" style={{animationDelay:'0.3s'}}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900">{animatedStats.employees}+</span>
              <span className="text-xs text-slate-500 font-medium">Employees Trained</span>
            </div>
            <div className="stat-card items-center text-center animate-slide-up" style={{animationDelay:'0.4s'}}>
              <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-violet-600" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900">{animatedStats.accuracy}%</span>
              <span className="text-xs text-slate-500 font-medium">Mastery Accuracy</span>
            </div>
            <div className="stat-card items-center text-center animate-slide-up" style={{animationDelay:'0.5s'}}>
              <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900">{animatedStats.reduction}%</span>
              <span className="text-xs text-slate-500 font-medium">Risk Reduction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Capabilities</h2>
          <p className="text-sm text-slate-500 mt-1">Enterprise-grade features designed for modern security teams.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="card p-5 flex gap-4 items-start group animate-slide-up" style={{animationDelay: `${0.1 * i}s`}}>
              <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Adaptive Learning Loop ── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="badge-blue mb-2"><RotateCw className="w-3 h-3 mr-1" /> Core Methodology</div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">The Adaptive Learning Loop</h2>
            <p className="text-sm text-slate-500 mt-1">Click through the 5 interconnected phases of continuous mastery.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Step</span>
            <span className="badge-blue font-bold">{activeStep} / 5</span>
          </div>
        </div>

        {/* Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {workflowSteps.map((item) => {
            const isSelected = activeStep === item.step;
            const colors = colorMap[item.color];
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                  isSelected
                    ? `${colors.bg} ${colors.border} shadow-md`
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                    isSelected ? `${colors.bg} ${colors.text}` : 'bg-slate-100 text-slate-400'
                  }`}>
                    {item.step}
                  </span>
                  {isSelected && <Activity className={`w-3.5 h-3.5 ${colors.text} animate-pulse-soft`} />}
                </div>
                <div className="font-semibold text-xs text-slate-800 truncate">{item.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{item.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Stepper Detail Card */}
        {(() => {
          const current = workflowSteps.find(s => s.step === activeStep);
          const colors = colorMap[current.color];
          const Icon = current.icon;
          return (
            <div className="card p-6 lg:p-8 animate-scale-in" key={activeStep}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{current.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{current.description}</p>
                  <ul className="space-y-2">
                    {current.metrics.map((m, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className={`w-4 h-4 ${colors.text} shrink-0`} />
                        <span className="font-mono">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <button onClick={() => setActiveTab('quiz')} className="btn-primary text-sm flex items-center justify-center gap-2">
                    Try It Live <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => setActiveStep((prev) => (prev % 5) + 1)} className="btn-secondary text-sm flex items-center justify-center gap-2">
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ── Comparison: Traditional vs AdaptIQ ── */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Why AdaptIQ?</h2>
          <p className="text-sm text-slate-500 mt-2">See how adaptive training outperforms traditional compliance modules.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional */}
          <div className="card p-6 border-danger-500/20">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-danger-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Traditional LMS</h3>
                <span className="badge-red text-[10px]">Legacy Approach</span>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { t: "Rigid Curricula", d: "Every employee takes the same 60-minute modules" },
                { t: "Binary Grading", d: "Ignores guesses and slips — false competency" },
                { t: "Productivity Loss", d: "Wastes time re-learning mastered basics" },
                { t: "No Feedback Loop", d: "Static post-test with no remediation cycle" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-danger-50 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-danger-500 text-xs font-bold">✕</span>
                  </span>
                  <div><strong className="text-slate-700">{item.t}:</strong> {item.d}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* AdaptIQ */}
          <div className="card p-6 border-primary-500/20 shadow-md shadow-primary-100/50">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">AdaptIQ Engine</h3>
                <span className="badge-blue text-[10px]">AI-Powered</span>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { t: "Bayesian Knowledge Tracing", d: "Continuously estimates P(L_t) after every response" },
                { t: "Slip & Guess Modeling", d: "Differentiates careless mistakes from lucky guesses" },
                { t: "Targeted Micro-Learning", d: "Skips mastered skills, serves 10-min remediation" },
                { t: "Dual AI Explainability", d: "Simple and Technical explanations for every concept" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-success-50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success-500" />
                  </span>
                  <div><strong className="text-slate-700">{item.t}:</strong> {item.d}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Architecture Stack ── */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="badge-slate mb-2 mx-auto"><Layers className="w-3 h-3 mr-1" /> System Architecture</div>
          <h2 className="text-2xl font-bold text-slate-900">Modern, Scalable Tech Stack</h2>
          <p className="text-sm text-slate-500 mt-2">Engineered for high performance and sub-second response latency.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Layers, title: "Frontend", desc: "React 19, Tailwind CSS, Recharts for reactive dashboards", color: "bg-primary-50 text-primary-600" },
            { icon: BrainCircuit, title: "AI / ML Engine", desc: "BKT mastery estimation, Cosine similarity for recommendations", color: "bg-indigo-50 text-indigo-600" },
            { icon: FileText, title: "Backend & APIs", desc: "FastAPI REST endpoints with async processing and PostgreSQL", color: "bg-emerald-50 text-emerald-600" },
            { icon: Lock, title: "Security", desc: "Role-based access, token auth, encrypted data at rest", color: "bg-amber-50 text-amber-600" },
          ].map((item, i) => (
            <div key={i} className="card p-5 text-center space-y-3 group animate-slide-up" style={{animationDelay:`${0.1*i}s`}}>
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="card p-8 lg:p-10 bg-gradient-to-r from-primary-50 via-white to-indigo-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">AI Knowledge Coach</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Need help understanding a concept?</h3>
          <p className="text-sm text-slate-500">Ask our AI Coach for step-by-step explanations of any cybersecurity attack vector or defense mechanism.</p>
        </div>
        <button onClick={onOpenAITutor} className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap">
          <Sparkles className="w-4 h-4" />
          Ask AI Coach
        </button>
      </section>

    </div>
  );
}
