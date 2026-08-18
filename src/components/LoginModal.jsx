import { ShieldCheck, UserCheck, Briefcase, X } from 'lucide-react';

const DEMO_PERSONAS = [
  {
    id: 'emp_hr',
    name: 'Priya Sharma',
    role: 'HR Coordinator',
    department: 'People Operations',
    avatar: '👩‍💼',
    initialMastery: {
      phishing: 0.25,
      passwords: 0.70,
      social_engineering: 0.40,
      data_handling: 0.85,
      incident_reporting: 0.20
    }
  },
  {
    id: 'emp_dev',
    name: 'Alex Rivera',
    role: 'Junior Software Engineer',
    department: 'Engineering',
    avatar: '👨‍💻',
    initialMastery: {
      phishing: 0.85,
      passwords: 0.90,
      social_engineering: 0.65,
      data_handling: 0.75,
      incident_reporting: 0.35
    }
  }
];

export { DEMO_PERSONAS };

export default function LoginModal({ isOpen, onClose, onSelectUser, currentUser }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Select Demo User</h3>
            <p className="text-xs text-slate-400">Switch profile to test adaptive learning pathways</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {DEMO_PERSONAS.map((persona) => {
            const isSelected = currentUser?.id === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => {
                  onSelectUser(persona);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{persona.avatar}</span>
                  <div>
                    <div className="font-semibold text-sm">{persona.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> {persona.role} • {persona.department}
                    </div>
                  </div>
                </div>
                {isSelected && <UserCheck className="w-5 h-5 text-indigo-400" />}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          ⚡ Instant persona switching without login friction
        </p>
      </div>
    </div>
  );
}