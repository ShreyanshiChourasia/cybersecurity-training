import { CheckCircle, Lock, Play, CircleDot } from 'lucide-react';

export function SkillNode({ title, status, isLast }) {
  let StatusIcon = CircleDot;
  let statusColor = "text-slate-400";
  let borderClass = "border-slate-200";
  let bgClass = "bg-white";

  if (status === 'mastered') {
    StatusIcon = CheckCircle;
    statusColor = "text-success-600";
    borderClass = "border-success-600";
    bgClass = "bg-success-50";
  } else if (status === 'active') {
    StatusIcon = Play;
    statusColor = "text-primary-600";
    borderClass = "border-primary-600 ring-2 ring-primary-100";
    bgClass = "bg-primary-50";
  } else if (status === 'locked') {
    StatusIcon = Lock;
    statusColor = "text-slate-300";
    borderClass = "border-slate-200 border-dashed";
    bgClass = "bg-slate-50";
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto">
      <div className={`w-full p-4 rounded-xl border-2 flex items-center shadow-sm transition-all ${borderClass} ${bgClass}`}>
        <div className={`p-2 rounded-full mr-4 bg-white shadow-sm ${statusColor}`}>
          <StatusIcon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>
            {title}
          </h3>
          <p className="text-xs text-slate-500 uppercase font-medium tracking-wide mt-1">
            {status}
          </p>
        </div>
      </div>
      
      {!isLast && (
        <div className={`w-1 h-8 my-1 ${status === 'mastered' ? 'bg-success-600' : 'bg-slate-200'}`} />
      )}
    </div>
  );
}
