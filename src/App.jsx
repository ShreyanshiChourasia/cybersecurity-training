import { useState } from 'react';
import LoginModal, { DEMO_PERSONAS } from './components/LoginModal';
import RoadmapView from './components/RoadmapView';
import DashboardView from './components/DashboardView';
import QuizScreen from './components/QuizScreen';
<<<<<<< Updated upstream
import WeakAreasView from './components/WeakAreasView';
=======
import { ShieldCheck, BookOpen, GitBranch, BarChart3 } from 'lucide-react';
>>>>>>> Stashed changes

function App() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [currentUserId, setCurrentUserId] = useState('emp_hr');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Persistent user profiles store
  const [userProfiles, setUserProfiles] = useState({
    emp_hr: {
      ...DEMO_PERSONAS[0],
      scores: { ...DEMO_PERSONAS[0].initialMastery }
    },
    emp_dev: {
      ...DEMO_PERSONAS[1],
      scores: { ...DEMO_PERSONAS[1].initialMastery }
    }
  });

  const currentUser = userProfiles[currentUserId] || userProfiles['emp_hr'];
  const currentMastery = currentUser.scores;

  const handleUserChange = (newUser) => {
    setCurrentUserId(newUser.id);
  };

  const handleSimulatePass = (topic) => {
    setUserProfiles((prev) => ({
      ...prev,
      [currentUserId]: {
        ...prev[currentUserId],
        scores: { ...prev[currentUserId].scores, [topic]: 0.90 }
      }
    }));
  };

  const handleSimulateFail = (topic) => {
    setUserProfiles((prev) => ({
      ...prev,
      [currentUserId]: {
        ...prev[currentUserId],
        scores: { ...prev[currentUserId].scores, [topic]: 0.20 }
      }
    }));
  };

  // Bayesian automated mastery calculation based on quiz performance and confidence
  const handleQuizUpdate = (topic, isCorrect, confidence = 75) => {
    const weight = confidence / 100;
    const currentScore = currentMastery[topic] ?? 0.50;

    let updatedScore;
    if (isCorrect) {
      updatedScore = Math.min(0.95, currentScore + (0.40 * weight));
    } else {
      updatedScore = Math.max(0.15, currentScore - (0.40 * weight));
    }

    updatedScore = Number(updatedScore.toFixed(2));

    setUserProfiles((prev) => ({
      ...prev,
      [currentUserId]: {
        ...prev[currentUserId],
        scores: {
          ...prev[currentUserId].scores,
          [topic]: updatedScore
        }
      }
    }));
  };

  const masteredCount = Object.values(currentMastery).filter((s) => s >= 0.70).length;

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <QuizScreen />
      <WeakAreasView/>
=======
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-900/60 backdrop-blur sticky top-0 z-30">
        <div className="flex items-center gap-2.5 font-bold text-lg text-indigo-400">
          <ShieldCheck className="w-6 h-6" />
          <span>CyberAdapt</span>
          <span className="text-[10px] uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 ml-2">
            Hackathon Build
          </span>
        </div>

        {/* 1-Click Persona Switcher */}
        <button
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs font-medium transition cursor-pointer"
        >
          <span>{currentUser.avatar}</span>
          <span className="text-white font-semibold">{currentUser.name}</span>
          <span className="text-slate-400">({currentUser.department})</span>
          <span className="text-indigo-400 text-[10px] uppercase font-bold ml-1">Switch ▾</span>
        </button>
      </header>

      {/* Main App Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
        {/* Step Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1. Diagnostic Quiz
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4" /> 2. Adaptive Roadmap
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> 3. Manager ROI Dashboard
          </button>
        </div>

        {/* Guided Step Views */}
        <div className="mt-4">
          {activeTab === 'quiz' && (
            <QuizScreen 
              onUpdateMastery={handleQuizUpdate}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              masteryScores={currentMastery}
              onSimulatePass={handleSimulatePass}
              onSimulateFail={handleSimulateFail}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              masteryScores={currentMastery}
              masteredCount={masteredCount}
              currentUser={currentUser}
            />
          )}
        </div>
      </main>

      {/* Persona Switch Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentUser={currentUser}
        onSelectUser={handleUserChange}
      />
>>>>>>> Stashed changes
    </div>
  );
}

export default App;