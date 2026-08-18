import{ useState,Fragment} from 'react';
import { CheckCircle2, Lock, PlayCircle, Sparkles } from 'lucide-react';
import { roadmapNodes as initialNodes } from '../mockData';

export default function RoadmapView() {
  const [nodes, setNodes] = useState(initialNodes);
  const [simulated, setSimulated] = useState(false);

  const toggleSimulation = () => {
    if (!simulated) {
      setNodes(prev =>
        prev.map(n =>
          n.id === 3 ? { ...n, status: 'mastered', score: 90 } :
          n.id === 4 ? { ...n, status: 'active', score: 20 } : n
        )
      );
      setSimulated(true);
    } else {
      setNodes(initialNodes);
      setSimulated(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white my-4">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            Adaptive Skill Tree
          </h2>
          <p className="text-sm text-slate-400">Dynamic 5-node learning pathway</p>
        </div>
        <button
          onClick={toggleSimulation}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
            simulated
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {simulated ? 'Reset Path' : 'Simulate Node Pass (Judge Demo)'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        {nodes.map((node, index) => {
          const isMastered = node.status === 'mastered';
          const isActive = node.status === 'active';
          const isLocked = node.status === 'locked';

          return (
            <Fragment key={node.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isMastered
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10'
                      : isActive
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800/50 border-slate-700 text-slate-500'
                  }`}
                >
                  {isMastered && <CheckCircle2 className="w-8 h-8" />}
                  {isActive && <PlayCircle className="w-8 h-8" />}
                  {isLocked && <Lock className="w-8 h-8" />}
                </div>
                <span className="mt-2 text-xs font-medium text-slate-300 max-w-[100px] truncate">
                  {node.title}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {node.status}
                </span>
              </div>
              {index < nodes.length - 1 && (
                <div className="hidden md:block flex-1 h-0.5 bg-slate-800" />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}