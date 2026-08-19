import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { Quiz } from './pages/Quiz';
import { Roadmap } from './pages/Roadmap';
import { Dashboard } from './pages/Dashboard';
import AITutorModal from './components/AITutorModal';
import WeakAreasView from './components/WeakAreasView';
import { JudgeDataDrawer } from './components/dashboard/JudgeDataDrawer';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <LandingPage setActiveTab={setActiveTab} onOpenDrawer={() => setIsDrawerOpen(true)} onOpenAITutor={() => setIsAITutorOpen(true)} />;
      case 'quiz': return <Quiz />;
      case 'roadmap': return <Roadmap />;
      case 'remediation': return <WeakAreasView onNavigateToQuiz={() => setActiveTab('quiz')} />;
      case 'analytics': return <Dashboard />;
      default: return <LandingPage setActiveTab={setActiveTab} onOpenDrawer={() => setIsDrawerOpen(true)} onOpenAITutor={() => setIsAITutorOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-slate-800">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      <main className="flex-1 w-full mx-auto">
        {renderView()}
      </main>
      
      {/* Modals and Drawers */}
      <JudgeDataDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <AITutorModal isOpen={isAITutorOpen} onClose={() => setIsAITutorOpen(false)} />
    </div>
  );
}

export default App;