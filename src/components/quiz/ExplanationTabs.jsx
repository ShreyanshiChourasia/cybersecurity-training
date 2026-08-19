import { useState } from 'react';

export function ExplanationTabs({ techExplanation, simpleExplanation }) {
  const [activeTab, setActiveTab] = useState('simple');

  if (!techExplanation && !simpleExplanation) return null;

  return (
    <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
      <div className="flex border-b border-slate-200 bg-white">
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'simple' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('simple')}
        >
          Simple Analogy
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'tech' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('tech')}
        >
          Technical Solution
        </button>
      </div>
      <div className="p-5 text-sm text-slate-700 leading-relaxed">
        {activeTab === 'simple' ? simpleExplanation : techExplanation}
      </div>
    </div>
  );
}
