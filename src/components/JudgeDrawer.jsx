import React, { useState } from 'react';
import { Sliders, X, Sparkles, Activity, FileCode, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { PRESET_SCENARIOS } from '../mockData';

export default function JudgeDrawer({ 
  isOpen, 
  onClose, 
  domainState, 
  lastAttempt, 
  onApplyScenario,
  attemptHistory = [] 
}) {
  const [selectedSubDomain, setSelectedSubDomain] = useState('Phishing Awareness');
  const [activeViewTab, setActiveViewTab] = useState('math'); // 'math' | 'log' | 'presets'

  if (!isOpen) return null;

  const currentDomain = domainState[selectedSubDomain] || {
    p_know: 0.72,
    p_transit: 0.15,
    p_slip: 0.10,
    p_guess: 0.20
  };

  const prior = currentDomain.p_know;
  const pSlip = currentDomain.p_slip ?? 0.10;
  const pGuess = currentDomain.p_guess ?? 0.20;
  const pTransit = currentDomain.p_transit ?? 0.15;

  // Real-time calculation steps for Correct case
  const numCorrect = (prior * (1 - pSlip)).toFixed(4);
  const denCorrect = (Number(numCorrect) + (1 - prior) * pGuess).toFixed(4);
  const postCorrect = (Number(numCorrect) / Number(denCorrect)).toFixed(4);
  const nextPriorCorrect = (Number(postCorrect) + (1 - Number(postCorrect)) * pTransit).toFixed(4);

  // Real-time calculation steps for Incorrect case
  const numWrong = (prior * pSlip).toFixed(4);
  const denWrong = (Number(numWrong) + (1 - prior) * (1 - pGuess)).toFixed(4);
  const postWrong = (Number(numWrong) / Number(denWrong)).toFixed(4);
  const nextPriorWrong = (Number(postWrong) + (1 - Number(postWrong)) * pTransit).toFixed(4);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 p-6 shadow-2xl flex flex-col justify-between text-white overflow-y-auto">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Judge BKT Telemetry</h3>
                  <p className="text-[11px] text-slate-400">SIH1409 Live Parameter Inspector</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Drawer */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveViewTab('math')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
                  activeViewTab === 'math' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bayes Math
              </button>
              <button
                onClick={() => setActiveViewTab('presets')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
                  activeViewTab === 'presets' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Scenarios
              </button>
              <button
                onClick={() => setActiveViewTab('log')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
                  activeViewTab === 'log' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Event Log ({attemptHistory.length})
              </button>
            </div>

            {activeViewTab === 'math' && (
              <div className="space-y-5">
                
                {/* Subdomain Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Inspect Sub-Domain Parameters:
                  </label>
                  <select
                    value={selectedSubDomain}
                    onChange={(e) => setSelectedSubDomain(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-cyan-300 font-semibold focus:outline-none focus:border-cyan-500"
                  >
                    {Object.keys(domainState).map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>

                {/* 4 Core BKT Parameters Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">P(L) Prior Knowledge</span>
                    <span className="text-cyan-400 text-lg font-mono font-bold">{prior.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-500 block">{(prior * 100).toFixed(0)}% mastery</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">P(T) Learning Rate</span>
                    <span className="text-emerald-400 text-lg font-mono font-bold">{pTransit.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-500 block">Transition rate</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">P(S) Slip Probability</span>
                    <span className="text-amber-400 text-lg font-mono font-bold">{pSlip.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-500 block">Careless mistake</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">P(G) Guess Probability</span>
                    <span className="text-rose-400 text-lg font-mono font-bold">{pGuess.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-500 block">Lucky guess</span>
                  </div>
                </div>

                {/* Step-by-Step Bayes Mathematical Formulation */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Live Bayes Equation Breakdown
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Bayes' Rule</span>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1.5">
                    <div className="text-emerald-400 font-semibold">// If Learner Answers Correctly:</div>
                    <div className="text-slate-400">P(L|Corr) = [P(L)·(1-P(S))] / [P(L)·(1-P(S)) + (1-P(L))·P(G)]</div>
                    <div className="text-cyan-300">
                      = [{prior}·{1 - pSlip}] / [{numCorrect} + {(1 - prior).toFixed(2)}·{pGuess}]
                    </div>
                    <div className="text-emerald-300 font-bold">
                      = {numCorrect} / {denCorrect} &rarr; P(L_next) = {nextPriorCorrect}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1.5">
                    <div className="text-rose-400 font-semibold">// If Learner Answers Incorrectly:</div>
                    <div className="text-slate-400">P(L|Incorr) = [P(L)·P(S)] / [P(L)·P(S) + (1-P(L))·(1-P(G))]</div>
                    <div className="text-rose-300 font-bold">
                      = {numWrong} / {denWrong} &rarr; P(L_next) = {nextPriorWrong}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeViewTab === 'presets' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Quickly inject predefined learner competency profiles to demo different stages to hackathon judges:
                </p>

                {Object.entries(PRESET_SCENARIOS).map(([key, scenario]) => (
                  <div key={key} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-white">{scenario.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{scenario.description}</p>
                    
                    <button
                      onClick={() => {
                        onApplyScenario(key);
                        onClose();
                      }}
                      className="w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      Load {scenario.name.split(':')[0]}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeViewTab === 'log' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Recent Assessment Updates:</span>
                  <span className="font-mono">{attemptHistory.length} events</span>
                </div>

                {attemptHistory.length === 0 ? (
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center text-xs text-slate-500">
                    No quiz events logged yet. Take a quiz question to see live BKT telemetry trace.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {attemptHistory.slice(-8).reverse().map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-400">{item.subDomain}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                            item.isCorrect ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                          }`}>
                            {item.isCorrect ? 'CORRECT' : 'INCORRECT'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{item.questionText}</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                          <span>Confidence: {item.confidence}%</span>
                          <span className={item.delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                            Delta: {item.delta >= 0 ? `+${(item.delta * 100).toFixed(1)}%` : `${(item.delta * 100).toFixed(1)}%`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-500">
              AdaptIQ • Bayesian Knowledge Tracing Engine • SIH 2026
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}