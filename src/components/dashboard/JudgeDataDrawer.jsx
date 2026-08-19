import { useState, useEffect } from 'react';
import { X, Code2, Database } from 'lucide-react';
import { getMasteryState } from '../../api/assessmentApi';
import { fetchRecommendations } from '../../api/recommendationApi';

export function JudgeDataDrawer({ isOpen, onClose }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      // Fetch raw data when drawer opens
      Promise.all([
        getMasteryState("mock_user_1"),
        fetchRecommendations("mock_user_1")
      ]).then(([mastery, recs]) => {
        setData({ mastery, recommendations: recs, model_metrics: { guess_rate: 0.15, slip_rate: 0.05 } });
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center text-slate-200 font-semibold">
            <Database className="w-5 h-5 mr-2 text-primary-400" />
            Raw Data View (Judge)
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center mb-3">
              <Code2 className="w-4 h-4 mr-2" />
              BKT Mastery State
            </h4>
            <pre className="text-xs text-green-400 font-mono overflow-x-auto">
              {data ? JSON.stringify(data.mastery, null, 2) : 'Loading...'}
            </pre>
          </div>

          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center mb-3">
              <Code2 className="w-4 h-4 mr-2" />
              Content-Based Recommendations
            </h4>
            <pre className="text-xs text-blue-400 font-mono overflow-x-auto">
              {data ? JSON.stringify(data.recommendations, null, 2) : 'Loading...'}
            </pre>
          </div>

          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center mb-3">
              <Code2 className="w-4 h-4 mr-2" />
              AI/ML Model Metrics
            </h4>
            <pre className="text-xs text-purple-400 font-mono overflow-x-auto">
              {data ? JSON.stringify(data.model_metrics, null, 2) : 'Loading...'}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
