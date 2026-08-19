import { useState } from 'react';
import { 
  Shield, LayoutDashboard, Crosshair, BookOpen, 
  Radio, Map, Settings, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenDrawer, onOpenAITutor }) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quiz', label: 'Adaptive Quiz', icon: Crosshair },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map },
    { id: 'remediation', label: 'Training Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics & ROI', icon: Radio },
  ];

  const bottomItems = [
    { label: 'AI Coach', icon: HelpCircle, action: onOpenAITutor },
    { label: 'Settings', icon: Settings, action: onOpenDrawer },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col fixed top-0 left-0 h-screen bg-sidebar z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-700/50">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-white tracking-tight">AdaptIQ</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Security Training</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item w-full ${activeTab === item.id ? 'active' : ''} ${collapsed ? 'justify-center px-3' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="px-3 py-4 border-t border-slate-700/50 space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`nav-item w-full ${collapsed ? 'justify-center px-3' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Collapse Toggle */}
        <div className="px-3 py-3 border-t border-slate-700/50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="nav-item w-full justify-center"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg">
        <div className="flex items-center justify-around py-2 px-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'text-primary-600' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'animate-scale-in' : ''}`} />
              <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
