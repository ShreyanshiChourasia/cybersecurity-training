import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Activity, 
  Target, 
  BookOpen, 
  RotateCw, 
  Zap, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Lock, 
  FileText, 
  TrendingUp, 
  Database, 
  Cpu, 
  Sliders, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function LandingPage({ setActiveTab, onOpenDrawer, onOpenAITutor, domains }) {
  const [activeStep, setActiveStep] = useState(1);

  const workflowSteps = [
    {
      step: 1,
      title: "1. Learner Takes Quiz",
      subtitle: "Diagnostic & Confidence Scoring",
      badge: "Assessment Interface",
      description: "The learner answers calibrated IT & Cybersecurity scenario questions while providing self-reported confidence ratings (0-100%).",
      metrics: "Captures: User response correctness + Response time + Confidence level.",
      actionTab: 'quiz'
    },
    {
      step: 2,
      title: "2. BKT Mastery Estimation",
      subtitle: "Bayesian Knowledge Tracing",
      badge: "Probabilistic Engine",
      description: "Our mathematical BKT engine updates mastery probability P(L_t) dynamically per sub-domain using Bayes' theorem, adjusting for slips P(S) and guesses P(G).",
      metrics: "Formula: P(L_t|Obs) = [P(L_{t-1})·(1-P(S))] / [P(L_{t-1})·(1-P(S)) + (1-P(L_{t-1}))·P(G)]",
      actionTab: 'drawer'
    },
    {
      step: 3,
      title: "3. Identify Weaknesses",
      subtitle: "Sub-Domain Gap Analysis",
      badge: "Precision Diagnosis",
      description: "Identifies the learner's lowest mastery sub-domains (e.g. Social Engineering at 45% vs Phishing at 72%) and isolates specific misconception vectors.",
      metrics: "Flags sub-domains below enterprise proficiency threshold (<80%).",
      actionTab: 'roadmap'
    },
    {
      step: 4,
      title: "4. Recommend Training",
      subtitle: "Content-Based Micro-Learning",
      badge: "Recommendation Engine",
      description: "Generates tailored 10-15 minute micro-learning modules matched directly to flagged weak topics via cosine vector similarity.",
      metrics: "Targeted bite-sized courses prevent cognitive overload and save 4.5+ training hours.",
      actionTab: 'remediation'
    },
    {
      step: 5,
      title: "5. Generate Next Quiz",
      subtitle: "Continuous Adaptive Loop",
      badge: "Adaptive Re-Assessment",
      description: "Dynamically synthesizes the next assessment round, re-testing previously failed concepts while skipping mastered domains to verify retention.",
      metrics: "Loop repeats continuously until verified mastery (>85%) is achieved across all nodes.",
      actionTab: 'quiz'
    }
  ];

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* SIH 2026 Header Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
              Smart India Hackathon 2026
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Problem Statement ID: SIH1409
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
              Theme: Smart Education (Software)
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            AI-Powered <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Adaptive IT & Security</span> Training System
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed">
            <strong className="text-primary-600">AdaptIQ</strong> replaces static, time-wasting corporate LMS slides with a 
            closed-loop <strong className="text-indigo-700">Bayesian Knowledge Tracing (BKT)</strong> engine. It pinpoints real-time competency gaps, recommends targeted micro-training, and accelerates workforce job-readiness.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('quiz')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
              Launch Adaptive Assessment
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-900 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-primary-600" />
              Explore Skill Tree
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white hover:bg-slate-800 text-slate-600 border border-slate-200 hover:border-slate-700 transition-all cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              ROI & Radar Forecaster
            </button>

            <button
              onClick={onOpenDrawer}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-50 hover:bg-primary-50/60 text-primary-700 border border-cyan-800/80 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-primary-600" />
              Live BKT Telemetry
            </button>
          </div>

          {/* Value Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200/80 text-left">
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
              <span className="text-xs text-slate-500 block font-medium">Core Algorithm</span>
              <span className="text-lg font-bold text-primary-600">Bayesian BKT</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Probabilistic slip & guess</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
              <span className="text-xs text-slate-500 block font-medium">Time-to-Productivity</span>
              <span className="text-lg font-bold text-emerald-400">4.5 hrs Saved</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Per employee on average</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
              <span className="text-xs text-slate-500 block font-medium">Explainability</span>
              <span className="text-lg font-bold text-indigo-600">Dual AI Modes</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Simple & Technical insights</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
              <span className="text-xs text-slate-500 block font-medium">IT Sub-Domains</span>
              <span className="text-lg font-bold text-amber-400">5 Cyber Verticals</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Phishing to Incident SLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 5-Step Adaptive Learning Loop Visualizer (Slide 2 & 3 Methodology) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-600 border border-cyan-800 mb-2">
              <RotateCw className="w-3.5 h-3.5" />
              SIH1409 Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              The End-to-End Adaptive Learning Loop
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Click through the 5 interconnected phases of the AdaptIQ continuous mastery cycle.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Active Step:</span>
            <span className="text-xs font-bold text-primary-600 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              {activeStep} of 5
            </span>
          </div>
        </div>

        {/* Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {workflowSteps.map((item) => {
            const isSelected = activeStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-500 text-slate-900 shadow-lg shadow-cyan-950'
                    : 'bg-white/70 border-slate-200 text-slate-500 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                  }`}>
                    Step {item.step}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-primary-600 animate-pulse" />}
                </div>
                <div className="font-semibold text-xs text-slate-200 truncate">{item.title.split('. ')[1]}</div>
                <div className="text-[10px] text-slate-500 truncate">{item.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Stepper Detail Card */}
        {(() => {
          const current = workflowSteps.find(s => s.step === activeStep);
          return (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                      {current.badge}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">{current.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{current.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{current.description}</p>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-primary-700">
                    {current.metrics}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
                  {current.actionTab === 'quiz' && (
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-cyan-500/20"
                    >
                      Try Quiz in Action <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  {current.actionTab === 'drawer' && (
                    <button
                      onClick={onOpenDrawer}
                      className="w-full py-3 px-4 bg-primary-50 hover:bg-cyan-900 text-primary-700 border border-cyan-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      Inspect Live BKT Math <Sliders className="w-4 h-4" />
                    </button>
                  )}
                  {current.actionTab === 'roadmap' && (
                    <button
                      onClick={() => setActiveTab('roadmap')}
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-slate-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-indigo-600/20"
                    >
                      View Adaptive Skill Tree <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  {current.actionTab === 'remediation' && (
                    <button
                      onClick={() => setActiveTab('remediation')}
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
                    >
                      Open Remediation Hub <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setActiveStep((prev) => (prev % 5) + 1)}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-600 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition"
                  >
                    Next Loop Step ({activeStep === 5 ? 'Step 1' : `Step ${activeStep + 1}`}) <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Traditional LMS vs AdaptIQ Comparison Matrix */}
      <section className="bg-white/60 border border-slate-200 rounded-3xl p-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Why AdaptIQ Outperforms Traditional Training
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Comparison between static corporate compliance portals and our AI adaptive engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Traditional LMS */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-900/40">
              <h3 className="font-bold text-rose-300 text-base">Traditional Static LMS</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                Legacy Approach
              </span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Linear Rigid Curricula:</strong> Every employee is forced through identical 60-minute modules regardless of prior knowledge.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Binary Grading Without Context:</strong> Ignores lucky guesses and careless slips, leading to false competency assumptions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>High Productivity Loss:</strong> Wastes senior staff time re-learning mastered basics while failing to fix true weak spots.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Static Post-Test:</strong> No dynamic re-assessment or closed feedback remediation loop.</span>
              </li>
            </ul>
          </div>

          {/* AdaptIQ Engine */}
          <div className="p-6 rounded-2xl bg-primary-50/30 border border-cyan-800/60 space-y-4 shadow-lg shadow-cyan-950/50">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-800/60">
              <h3 className="font-bold text-primary-700 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-600" />
                AdaptIQ Intelligent Training
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-cyan-700">
                SIH1409 Innovation
              </span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Bayesian Knowledge Tracing:</strong> Continuously estimates probability of mastery P(L_t) after every response.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Calibrated Slip & Guess Modeling:</strong> Differentiates between careless mistakes P(S) and lucky guesses P(G).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Targeted Micro-Remediation:</strong> Skips mastered skills and serves concise 10-minute training only on flagged gaps.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Transparent Dual AI Explainability:</strong> Provides instant Simple and Technical explanations for every concept.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Architecture & Stack Showcase (Slide 3) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-800 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            System Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Modern, Cloud-Ready & Explainable Stack
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Engineered for high performance, sub-second latency, and interpretable mathematical guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 border border-cyan-800 flex items-center justify-center text-primary-600">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Frontend Layer</h4>
            <p className="text-xs text-slate-500">
              React 19, Tailwind CSS, Lucide icons & Recharts for reactive UI and micro-interactions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-800 flex items-center justify-center text-indigo-600">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">AI / ML Engine</h4>
            <p className="text-xs text-slate-500">
              Bayesian Knowledge Tracing (BKT), Cosine Vector Similarity & Rule-based Adaptive Quiz Gen.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Backend & APIs</h4>
            <p className="text-xs text-slate-500">
              FastAPI async REST endpoints (/assess, /recommend, /next-quiz) backed by PostgreSQL.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Security & Analytics</h4>
            <p className="text-xs text-slate-500">
              Role-Based Access Control, HTTPS token auth, 5-axis Radar & Real-time ROI Forecaster.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access to AI Tutor / Explainability */}
      <section className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-indigo-800/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">Explainable AI & Tutor</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Need Concept Clarity on Cyber Threats?</h3>
          <p className="text-sm text-slate-600">
            Ask our simulated AI Knowledge Coach for step-by-step explanations, attack simulations, or deep dives into the BKT math.
          </p>
        </div>
        <button
          onClick={onOpenAITutor}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-900 font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-lg shadow-indigo-600/30 transition cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          Ask AI Knowledge Coach
        </button>
      </section>

    </div>
  );
}
