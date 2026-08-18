import { useState, useEffect } from 'react';
import QuizScreen from './components/QuizScreen';
import RoadmapView from './components/RoadmapView';
import WeakAreasView from './components/WeakAreasView';
import DashboardView from './components/DashboardView';
import LoginModal from './components/LoginModal';
import JudgeDrawer from './components/JudgeDrawer';
import { 
  ShieldCheck, 
  Map, 
  GraduationCap, 
  BarChart3, 
  Sliders, 
  User
} from 'lucide-react';

// Persona-specific default baseline mastery profiles
const ROLE_DEFAULT_MASTERIES = {
  'HR Specialist': {
    phishing: 0.35,
    passwords: 0.45,
    social_engineering: 0.60,
    data_handling: 0.85,
    incident_reporting: 0.50
  },
  'DevOps Lead': {
    phishing: 0.90,
    passwords: 0.95,
    social_engineering: 0.40,
    data_handling: 0.60,
    incident_reporting: 0.80
  },
  'Financial Controller': {
    phishing: 0.40,
    passwords: 0.70,
    social_engineering: 0.30,
    data_handling: 0.90,
    incident_reporting: 0.65
  },
  'Executive Assistant': {
    phishing: 0.30,
    passwords: 0.50,
    social_engineering: 0.35,
    data_handling: 0.45,
    incident_reporting: 0.70
  }
};

const DEFAULT_USER = {
  name: 'Rivaa',
  role: 'HR Specialist',
  department: 'Human Resources'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isJudgeDrawerOpen, setIsJudgeDrawerOpen] = useState(false);
  const [isBackendLive, setIsBackendLive] = useState(false);

  // 1. Load active persona from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('adaptiq_user');
    return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
  });

  // 2. Load USER-SPECIFIC mastery from localStorage
  const [masteryScores, setMasteryScores] = useState(() => {
    const userRole = currentUser.role || 'HR Specialist';
    const savedScores = localStorage.getItem(`adaptiq_mastery_${userRole}`);
    return savedScores ? JSON.parse(savedScores) : (ROLE_DEFAULT_MASTERIES[userRole] || ROLE_DEFAULT_MASTERIES['HR Specialist']);
  });

  // Persist current active user
  useEffect(() => {
    localStorage.setItem('adaptiq_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Persist mastery changes isolated to the ACTIVE user persona
  useEffect(() => {
    if (currentUser?.role) {
      localStorage.setItem(`adaptiq_mastery_${currentUser.role}`, JSON.stringify(masteryScores));
    }
  }, [masteryScores, currentUser]);

  // Check Backend Live Status
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/quiz', { method: 'HEAD' });
        setIsBackendLive(res.ok);
      } catch {
        setIsBackendLive(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  // 3. Multi-User Persona Switcher Handler
  const handleUserLogin = (userProfile) => {
    setCurrentUser(userProfile);
    setIsLoginOpen(false);

    // Retrieve or initialize this specific persona's scores
    const existingScores = localStorage.getItem(`adaptiq_mastery_${userProfile.role}`);
    if (existingScores) {
      setMasteryScores(JSON.parse(existingScores));
    } else {
      const defaultRoleScores = ROLE_DEFAULT_MASTERIES[userProfile.role] || ROLE_DEFAULT_MASTERIES['HR Specialist'];
      setMasteryScores(defaultRoleScores);
      localStorage.setItem(`adaptiq_mastery_${userProfile.role}`, JSON.stringify(defaultRoleScores));
    }
  };

  const handleSimulatePass = (topic) => {
    setMasteryScores((prev) => ({ ...prev, [topic]: 0.90 }));
  };

  const handleSimulateFail = (topic) => {
    setMasteryScores((prev) => ({ ...prev, [topic]: 0.25 }));
  };

  const handleQuizComplete = (finalScores) => {
    setMasteryScores(finalScores);
    if (currentUser?.role) {
      localStorage.setItem(`adaptiq_mastery_${currentUser.role}`, JSON.stringify(finalScores));
    }
    setActiveTab('roadmap');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  AdaptIQ
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                  isBackendLive
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isBackendLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {isBackendLive ? 'Backend Live' : 'Offline Fallback'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Precision Security Training & Workforce Risk Mitigation
              </p>
            </div>
          </div>

          {/* Connected Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-2xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">1. Diagnostic Assessment</span>
              <span className="md:hidden">Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden md:inline">2. Adaptive Roadmap</span>
              <span className="md:hidden">Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab('weak_areas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'weak_areas'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">3. Targeted Upskilling</span>
              <span className="md:hidden">Courses</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">4. Manager Dashboard</span>
              <span className="md:hidden">ROI</span>
            </button>
          </nav>

          {/* User Persona & Judge Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{currentUser.name}</span>
            </button>

            <button
              onClick={() => setIsJudgeDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition cursor-pointer shadow-lg shadow-amber-500/5"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Judge Drawer</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'quiz' && (
          <QuizScreen 
            onQuizComplete={handleQuizComplete} 
            onProceedToRoadmap={() => setActiveTab('roadmap')}
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
            currentUser={currentUser}
            onOpenJudgeDrawer={() => setIsJudgeDrawerOpen(true)}
          />
        )}
      </main>

      {/* User Login Persona Modal */}
      {isLoginOpen && (
        <LoginModal
          currentUser={currentUser}
          onLogin={handleUserLogin}
          onClose={() => setIsLoginOpen(false)}
        />
      )}

      {/* Global Judge Data Drawer */}
      <JudgeDrawer
        isOpen={isJudgeDrawerOpen}
        onClose={() => setIsJudgeDrawerOpen(false)}
        masteryScores={masteryScores}
        setMasteryScores={setMasteryScores}
        currentUser={currentUser}
        setCurrentUser={handleUserLogin}
      />
    </div>
  );
}