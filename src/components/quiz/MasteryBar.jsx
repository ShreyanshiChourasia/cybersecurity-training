export function MasteryBar({ subdomain, mastery }) {
  if (mastery === undefined || mastery === null) return null;
  
  const percentage = Math.round(mastery * 100);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {subdomain.replace('_', ' ')} Mastery
        </span>
        <span className="text-sm font-bold text-slate-700">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
