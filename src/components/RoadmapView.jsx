import React, { useState } from 'react';
import { CheckCircle2, Lock, PlayCircle, Sparkles, ArrowRight, BookOpen, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoadmapView({ 
  domainState, 
  onSimulatePass, 
  onResetPath, 
  onNavigateToQuiz, 
  onNavigateToRemediation 
}) {
  const [selectedNode, setSelectedNode] = useState(null);

  // Map domainState into 5 roadmap nodes
  const nodes = [
    {
      id: 1,
      title: 'Phishing Awareness',
      domainKey: 'Phishing Awareness',
      category: 'Email & Link Defense',
      score: Math.round((domainState['Phishing Awareness']?.p_know ?? 0.72) * 100),
      description: 'Header analysis, typosquatting domains, urgency red flags, and reverse-proxy spoofing.'
    },
    {
      id: 2,
      title: 'Password Hygiene',
      domainKey: 'Password Hygiene',
      category: 'Identity & Access Mgmt',
      score: Math.round((domainState['Password Hygiene']?.p_know ?? 0.85) * 100),
      description: 'Entropy standards, password managers, FIDO2/WebAuthn hardware keys, and credential stuffing defense.'
    },
    {
      id: 3,
      title: 'Social Engineering',
      domainKey: 'Social Engineering',
      category: 'Human Factor Defense',
      score: Math.round((domainState['Social Engineering']?.p_know ?? 0.45) * 100),
      description: 'Pretexting, AI voice vishing scams, badge tailgating, and executive impersonation protocol.'
    },
    {
      id: 4,
      title: 'Data Handling',
      domainKey: 'Confidential Data Handling',
      category: 'Information Security',
      score: Math.round((domainState['Confidential Data Handling']?.p_know ?? 0.60) * 100),
      description: 'PII classification, GDPR compliance, AES-256 encrypted transit, and generative AI leak prevention.'
    },
    {
      id: 5,
      title: 'Incident Reporting',
      domainKey: 'Incident Reporting & SLA',
      category: 'SecOps & Response',
      score: Math.round((domainState['Incident Reporting & SLA']?.p_know ?? 0.35) * 100),
      description: 'Golden-hour containment, host network isolation, Kerberos ticket revocation, and SOC breach escalation.'
    }
  ];

  const getNodeStatus = (score) => {
    if (score >= 80) return 'mastered';
    if (score >= 50) return 'active';
    return 'locked';
  };

  const handleSimulate = () => {
    onSimulatePass();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 py-4">
      
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic Adaptive Skill Tree
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cybersecurity Competency Pathway
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Nodes dynamically unlock and upgrade states in real-time as your Bayesian Knowledge Tracing scores evolve.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleSimulate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Simulate Remediation Jump (Judge Demo)
            </button>

            <button
              onClick={onResetPath}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            >
              Reset Pathway
            </button>
          </div>
        </div>

        {/* 5-Node Flowchart Layout */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {nodes.map((node, index) => {
              const status = getNodeStatus(node.score);
              const isMastered = status === 'mastered';
              const isActive = status === 'active';
              const isLocked = status === 'locked';
              const isSelected = selectedNode?.id === node.id;

              return (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`flex-1 w-full lg:w-auto p-4 rounded-2xl border transition-all cursor-pointer transform hover:-translate-y-1 ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 bg-slate-850 shadow-xl shadow-cyan-950'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        0{node.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isMastered
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : isActive
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-900/60'
                      }`}>
                        {status === 'locked' ? 'Needs Focus' : status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-all ${
                          isMastered
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/20'
                            : isActive
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}
                      >
                        {isMastered && <CheckCircle2 className="w-6 h-6" />}
                        {isActive && <PlayCircle className="w-6 h-6" />}
                        {isLocked && <Lock className="w-6 h-6" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-white truncate">{node.title}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{node.category}</p>
                        
                        {/* Mini Mastery Bar */}
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isMastered ? 'bg-emerald-400' : isActive ? 'bg-cyan-400' : 'bg-rose-400'
                            }`}
                            style={{ width: `${node.score}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-850 text-xs">
                      <span className="text-slate-400">Mastery:</span>
                      <span className={`font-mono font-bold ${
                        isMastered ? 'text-emerald-400' : isActive ? 'text-cyan-400' : 'text-rose-400'
                      }`}>
                        {node.score}%
                      </span>
                    </div>
                  </div>

                  {/* Connector Arrow for Desktop */}
                  {index < nodes.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center px-1 text-slate-700">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
            <span>Mastered (Score &ge; 80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            <span>Active In-Progress (50% - 79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
            <span>Remediation Required (&lt; 50%)</span>
          </div>
        </div>
      </div>

      {/* Selected Node Drill-Down Drawer / Inspector */}
      {selectedNode && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-semibold text-cyan-400">
                Node Inspector • #{selectedNode.id}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{selectedNode.title}</h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg border border-slate-700"
            >
              ✕ Close Inspector
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 block">Domain Curriculum</span>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{selectedNode.description}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 block">Current Status</span>
              <span className={`text-base font-bold block mt-1 ${
                selectedNode.score >= 80 ? 'text-emerald-400' : selectedNode.score >= 50 ? 'text-cyan-400' : 'text-rose-400'
              }`}>
                {selectedNode.score}% Mastery ({getNodeStatus(selectedNode.score).toUpperCase()})
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between gap-3">
              <button
                onClick={() => onNavigateToQuiz()}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                Test Skills in Adaptive Quiz <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigateToRemediation(selectedNode.domainKey)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                View Micro-Courses
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}