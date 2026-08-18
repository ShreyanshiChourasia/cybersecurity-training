import { useState } from 'react';
import LoginModal, { DEMO_PERSONAS } from './components/LoginModal';
import RoadmapView from './components/RoadmapView';
import DashboardView from './components/DashboardView';
import QuizScreen from './components/QuizScreen';
import WeakAreasView from './components/WeakAreasView';
import { ShieldCheck, BookOpen, GitBranch, BarChart3, Award, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [currentUserId, setCurrentUserId] = useState('emp_hr');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [masteryScores, setMasteryScores] = useState({
    phishing: 0.50,
    passwords: 0.50,
    social_engineering: 0.50,
    data_handling: 0.50,
    incident_reporting: 0.50,
  });

  const currentUser = DEMO_PERSONAS[currentUserId] || {
    name: 'Priya Sharma',
    role: 'People Operations',
    dept: 'Human Resources'
  };

  const handleSimulatePass = (topic) => {
    setMasteryScores((prev) => ({
      ...prev,
      [topic]: 0.90,
    }));
  };

  const handleSimulateFail = (topic) => {
    setMasteryScores((prev) => ({
      ...prev,
      [topic]: 0.25,
    }));
  };

  const handleQuizComplete = (finalMastery) => {
    if (finalMastery) {
      setMasteryScores(finalMastery);
    }
    setActiveTab('roadmap');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight">CyberAdapt</span>
              <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                Hackathon Build
              </span>
            </div>
          </div>

          {/* User Persona Switcher */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>{currentUser.name} ({currentUser.role})</span>
            <span className="text-[10px] text-indigo-400 uppercase font-bold ml-1">Switch ▾</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 border-t border-slate-800/60 pt-1">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition cursor-pointer border-b-2 ${
              activeTab === 'quiz'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Diagnostic Assessment</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition cursor-pointer border-b-2 ${
              activeTab === 'roadmap'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>2. Adaptive Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('weak_areas')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition cursor-pointer border-b-2 ${
              activeTab === 'weak_areas'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. Targeted Recommendations</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition cursor-pointer border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>4. Manager ROI Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'quiz' && (
          <QuizScreen
            onCompleteQuiz={handleQuizComplete}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            masteryScores={masteryScores}
            onSimulatePass={handleSimulatePass}
            onSimulateFail={handleSimulateFail}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'weak_areas' && (
          <WeakAreasView
            masteryScores={masteryScores}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            masteryScores={masteryScores}
            userId={currentUserId}
            onNavigate={setActiveTab}
          />
        )}
      </main>

      {/* Login / Persona Selection Modal */}
      {isLoginOpen && (
        <LoginModal
          currentUserId={currentUserId}
          onSelectUser={(id) => {
            setCurrentUserId(id);
            setIsLoginOpen(false);
          }}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}