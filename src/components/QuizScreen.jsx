import React, { useState } from 'react';
import { sampleQuiz } from '../data/quizData';
import JudgeDrawer from './JudgeDrawer';

export default function QuizScreen() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [explanationType, setExplanationType] = useState('simple');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSubmit = () => {
    if (selectedOption) setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-xl shadow-xl border border-slate-800 my-8 relative">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-cyan-950 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-800">
          Interactive Quiz
        </span>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition"
        >
          ⚙️ Open Judge Drawer
        </button>
      </div>

      <h2 className="text-xl font-bold mb-6 text-slate-100">{sampleQuiz.question}</h2>

      <div className="space-y-3 mb-6">
        {sampleQuiz.options.map((option) => (
          <button
            key={option.id}
            onClick={() => !submitted && setSelectedOption(option.id)}
            className={`w-full text-left p-4 rounded-lg border transition ${
              selectedOption === option.id 
                ? 'bg-cyan-950 border-cyan-500 text-white' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      <div className="mb-6 bg-slate-800 p-4 rounded-lg border border-slate-700">
        <label className="block text-xs font-semibold text-slate-400 mb-2">
          CONFIDENCE LEVEL: {confidence}%
        </label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={confidence} 
          onChange={(e) => setConfidence(e.target.value)}
          disabled={submitted}
          className="w-full accent-cyan-500 cursor-pointer"
        />
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 font-semibold rounded-lg text-white transition"
        >
          Submit Answer
        </button>
      ) : (
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="flex space-x-2 mb-3">
            <button
              onClick={() => setExplanationType('simple')}
              className={`px-3 py-1 text-xs rounded-md ${
                explanationType === 'simple' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}
            >
              Simple Explanation
            </button>
            <button
              onClick={() => setExplanationType('tech')}
              className={`px-3 py-1 text-xs rounded-md ${
                explanationType === 'tech' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}
            >
              Technical Explanation
            </button>
          </div>
          <p className="text-sm text-slate-300">
            {sampleQuiz.explanations[explanationType]}
          </p>
        </div>
      )}

      <JudgeDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        metrics={sampleQuiz.bkt_metrics} 
      />
    </div>
  );
}