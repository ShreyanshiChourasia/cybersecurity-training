import React from 'react';

export default function JudgeDrawer({ isOpen, onClose, metrics }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-slate-900 text-white p-6 shadow-2xl border-l border-slate-700 z-50 transition-all">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-cyan-400">📊 Judge Telemetry Drawer</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white font-bold">✕</button>
      </div>
      
      <p className="text-xs text-slate-400 mb-4">
        Real-time Bayesian Knowledge Tracing (BKT) parameters for the active user session.
      </p>

      <div className="space-y-4 text-sm">
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-slate-400 block text-xs">P(L) - Prior Knowledge</span>
          <span className="text-cyan-300 text-lg font-mono font-semibold">{metrics?.p_know ?? 0.72}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-slate-400 block text-xs">P(T) - Learning Rate</span>
          <span className="text-emerald-400 text-lg font-mono font-semibold">{metrics?.p_transit ?? 0.15}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-slate-400 block text-xs">P(S) - Slip Probability</span>
          <span className="text-amber-400 text-lg font-mono font-semibold">{metrics?.p_slip ?? 0.10}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-slate-400 block text-xs">P(G) - Guess Probability</span>
          <span className="text-rose-400 text-lg font-mono font-semibold">{metrics?.p_guess ?? 0.20}</span>
        </div>
      </div>
    </div>
  );
}