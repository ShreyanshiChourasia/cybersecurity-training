import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import QuizScreen from './components/QuizScreen';
import RoadmapView from './components/RoadmapView';
import WeakAreasView from './components/WeakAreasView';
import DashboardView from './components/DashboardView';
import JudgeDrawer from './components/JudgeDrawer';
import AITutorModal from './components/AITutorModal';
import { DEFAULT_DOMAINS } from './utils/bktEngine';
import { PRESET_SCENARIOS } from './mockData';
import { Shield, Sparkles, Sliders, CheckCircle2, RotateCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'quiz' | 'roadmap' | 'remediation' | 'analytics'
  const [domainState, setDomainState] = useState(DEFAULT_DOMAINS);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [completedCourses, setCompletedCourses] = useState({});
  const [selectedTopicForRemediation, setSelectedTopicForRemediation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [currentScenario, setCurrentScenario] = useState('midLevel');

  // Compute average overall mastery
  const domainValues = Object.values(domainState);
  const overallMastery = Math.round(
    (domainValues.reduce((acc, curr) => acc + (curr.p_know || 0), 0) / domainValues.length) * 100
  );

  // Handle Quiz BKT Update
  const handleBKTUpdate = (domainName, newMastery, attemptDetails) => {
    setDomainState(prev => ({
      ...prev,
      [domainName]: {
        ...prev[domainName],
        p_know: newMastery,
        history: [...(prev[domainName]?.history || []), newMastery]
      }
    }));

    setAttemptHistory(prev => [...prev, attemptDetails]);
  };

  // Handle Course completion toggle
  const handleCourseToggle = (courseId, topicName, isDone) => {
    setCompletedCourses(prev => ({
      ...prev,
      [courseId]: isDone
    }));

    if (isDone && domainState[topicName]) {
      // Completing a course boosts mastery by 0.08 (8%) in BKT
      const current = domainState[topicName].p_know;
      const boosted = Math.min(0.98, current + 0.08);

      setDomainState(prev => ({
        ...prev,
        [topicName]: {
          ...prev[topicName],
          p_know: Number(boosted.toFixed(4))
        }
      }));
    }
  };

  // Handle Judge simulation button on Roadmap
  const handleSimulatePass = () => {
    setDomainState(prev => ({
      ...prev,
      "Social Engineering": {
        ...prev["Social Engineering"],
        p_know: 0.90
      },
      "Confidential Data Handling": {
        ...prev["Confidential Data Handling"],
        p_know: 0.85
      },
      "Incident Reporting & SLA": {
        ...prev["Incident Reporting & SLA"],
        p_know: 0.82
      }
    }));
  };

  // Reset pathway to default
  const handleResetPath = () => {
    setDomainState(DEFAULT_DOMAINS);
    setCompletedCourses({});
    setAttemptHistory([]);
  };

  // Apply predefined preset scenario
  const handleApplyScenario = (scenarioKey) => {
    const scenario = PRESET_SCENARIOS[scenarioKey];
    if (!scenario) return;

    setCurrentScenario(scenarioKey);
    setDomainState(prev => {
      const updated = { ...prev };
      Object.entries(scenario.mastery).forEach(([domain, score]) => {
        if (updated[domain]) {
          updated[domain] = {
            ...updated[domain],
            p_know: score
          };
        }
      });
      return updated;
    });
  };

  const handleNavigateToRemediation = (topic = null) => {
    setSelectedTopicForRemediation(topic);
    setActiveTab('remediation');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        currentScenario={currentScenario}
        onSelectScenario={handleApplyScenario}
        overallMastery={overallMastery}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <LandingPage
            setActiveTab={setActiveTab}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onOpenAITutor={() => setIsAITutorOpen(true)}
            domains={domainState}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizScreen
            domainState={domainState}
            onBKTUpdate={handleBKTUpdate}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onNavigateToRemediation={handleNavigateToRemediation}
            onNavigateToRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            domainState={domainState}
            onSimulatePass={handleSimulatePass}
            onResetPath={handleResetPath}
            onNavigateToQuiz={() => setActiveTab('quiz')}
            onNavigateToRemediation={handleNavigateToRemediation}
          />
        )}

        {activeTab === 'remediation' && (
          <WeakAreasView
            domainState={domainState}
            selectedTopic={selectedTopicForRemediation}
            onCourseToggle={handleCourseToggle}
            completedCourses={completedCourses}
            onNavigateToQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'analytics' && (
          <DashboardView
            domainState={domainState}
            onNavigateToQuiz={() => setActiveTab('quiz')}
            onNavigateToRemediation={handleNavigateToRemediation}
          />
        )}
      </main>

      {/* Persistent Judge Telemetry Drawer */}
      <JudgeDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        domainState={domainState}
        onApplyScenario={handleApplyScenario}
        attemptHistory={attemptHistory}
      />

      {/* AI Knowledge Coach Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-slate-500 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300">AdaptIQ</span>
            <span>• SIH1409 (Smart India Hackathon 2026)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setIsDrawerOpen(true)} className="hover:text-cyan-400 transition">
              ⚙️ BKT Inspector
            </button>
            <span>•</span>
            <button onClick={() => setIsAITutorOpen(true)} className="hover:text-indigo-400 transition">
              🤖 AI Knowledge Coach
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('home')} className="hover:text-white transition">
              Home
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}