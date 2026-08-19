import { ArrowDown } from 'lucide-react';

export function WeaknessTrace({ currentTopic, weakPrerequisite }) {
  if (!weakPrerequisite) return null;
  
  return (
    <div className="card bg-danger-50 border-danger-200 mt-6 p-4">
      <h3 className="text-sm font-semibold text-danger-700 mb-3 text-center">Identified Foundation Gap</h3>
      
      <div className="flex flex-col items-center">
        <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700">
          {currentTopic.replace('_', ' ').toUpperCase()}
        </div>
        
        <ArrowDown className="w-4 h-4 text-danger-400 my-2" />
        
        <div className="px-3 py-1 bg-danger-100 border border-danger-300 rounded-md text-sm font-bold text-danger-700">
          {weakPrerequisite.replace('_', ' ').toUpperCase()}
        </div>
      </div>
      <p className="text-xs text-center text-danger-600 mt-3">
        Struggling with advanced topics often stems from this foundational area.
      </p>
    </div>
  );
}
