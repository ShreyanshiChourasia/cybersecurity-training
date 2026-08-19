import React from 'react';
import { Shield, Sparkles, Sliders, Bot, BarChart3, Map, CheckSquare, Zap, BookOpen } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenDrawer, 
  onOpenAITutor
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Tag */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center transition-all">
                <Shield className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-800">
                    AdaptIQ
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    SIH1409
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Adaptive Security Training</p>
              </div>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {[
              { id: 'home', label: 'Home / Pitch', icon: Zap },
              { id: 'quiz', label: 'Adaptive Quiz', icon: CheckSquare },
              { id: 'roadmap', label: 'Skill Tree', icon: Map },
              { id: 'remediation', label: 'Remediation Hub', icon: BookOpen },
              { id: 'analytics', label: 'Manager Dashboard', icon: BarChart3 }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* AI Coach Button */}
            <button
              onClick={onOpenAITutor}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Coach</span>
            </button>

            {/* Judge BKT Inspector Toggle */}
            <button
              onClick={onOpenDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-sm font-semibold transition-colors"
            >
              <Sliders className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Judge Drawer</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          {[
            { id: 'home', label: 'Home', icon: Zap },
            { id: 'quiz', label: 'Quiz', icon: CheckSquare },
            { id: 'roadmap', label: 'Roadmap', icon: Map },
            { id: 'remediation', label: 'Remediation', icon: BookOpen },
            { id: 'analytics', label: 'Dashboard', icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-primary-600 text-white font-medium' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
