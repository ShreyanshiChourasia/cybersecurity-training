import { useState } from 'react';
import { ShieldAlert, Map, LayoutDashboard } from 'lucide-react';
import { Quiz } from './pages/Quiz';
import { Roadmap } from './pages/Roadmap';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('quiz');

  const renderView = () => {
    switch (currentView) {
      case 'quiz': return <Quiz />;
      case 'roadmap': return <Roadmap />;
      case 'dashboard': return <Dashboard />;
      default: return <Quiz />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 sticky top-0 md:h-screen flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white flex items-center tracking-tight">
            <ShieldAlert className="w-6 h-6 mr-2 text-primary-500" />
            AdaptIQ
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Security Training</p>
        </div>
        
        <div className="flex-1 py-6 space-y-2 px-4 flex flex-row md:flex-col overflow-x-auto">
          <button 
            onClick={() => setCurrentView('quiz')}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors whitespace-nowrap md:whitespace-normal flex-1 md:flex-none ${currentView === 'quiz' ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
          >
            <ShieldAlert className="w-5 h-5 mr-3" />
            Adaptive Quiz
          </button>
          
          <button 
            onClick={() => setCurrentView('roadmap')}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors whitespace-nowrap md:whitespace-normal flex-1 md:flex-none ${currentView === 'roadmap' ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
          >
            <Map className="w-5 h-5 mr-3" />
            Learning Roadmap
          </button>

          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors whitespace-nowrap md:whitespace-normal flex-1 md:flex-none ${currentView === 'dashboard' ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Manager Dashboard
          </button>
        </div>
        
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center hidden md:block">
          API Mode: Mock<br/>
          (Change in env vars)
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 bg-background overflow-y-auto w-full h-full">
        {renderView()}
      </main>
    </div>
  );
}

export default App;