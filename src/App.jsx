import { useState } from 'react';
import './index.css';
import RoadmapView from './components/RoadmapView';
import DashboardView from './components/DashboardView';

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Cybersecurity Adaptive Platform
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Enterprise Training, Telemetry & Skill-Gap Optimization
          </p>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Skill Roadmap
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manager ROI Dashboard
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Quiz
          </button>
        </nav>
      </header>

      {/* Main Views */}
      <main className="max-w-6xl mx-auto mt-6">
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'quiz' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Quiz Module & Telemetry</h3>
            <p className="text-sm">Reserved for the live assessment engine.</p>
          </div>
        )}
      </main>
    </div>
  );
}