import { useState } from 'react';
import { X, UserCheck, Shield } from 'lucide-react';

const PRESET_USERS = [
  { name: 'Rivaa', role: 'HR Specialist', department: 'Human Resources' },
  { name: 'Marcus Vance', role: 'DevOps Lead', department: 'Cloud Infrastructure' },
  { name: 'Elena Rostova', role: 'Financial Controller', department: 'Corporate Finance' },
  { name: 'Sarah Chen', role: 'Executive Assistant', department: 'Executive Operations' }
];

export default function LoginModal({ currentUser, onLogin, onClose }) {
  const [customName, setCustomName] = useState(currentUser?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: customName || 'Security Analyst',
      role: currentUser?.role || 'HR Specialist',
      department: currentUser?.department || 'Corporate Operations'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">User & Persona Switcher</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Quick Select Enterprise Persona
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_USERS.map((user) => (
              <button
                key={user.role}
                type="button"
                onClick={() => onLogin(user)}
                className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
                  currentUser?.role === user.role
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs">{user.name}</div>
                <div className="text-[10px] text-indigo-400">{user.role}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-800">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Custom Employee Name</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Alex Rivera"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Apply Persona & Start Session</span>
          </button>
        </form>
      </div>
    </div>
  );
}
