import { useState } from 'react';
import { Button } from '../common/Button';
import { simulateWhatIf } from '../../api/simulationApi';

export function WhatIfSimulator({ userId, currentSubdomain, onSimulationComplete }) {
  const [loading, setLoading] = useState(false);

  const handleSimulate = async (isCorrect) => {
    try {
      setLoading(true);
      const result = await simulateWhatIf(userId, {
        subdomain: currentSubdomain,
        is_correct: isCorrect,
        difficulty: 3
      });
      onSimulationComplete(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-8 bg-slate-50 border-dashed border-2">
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-1">What-If Simulation</h3>
        <p className="text-xs text-slate-500">Judge Demo: Simulate a pass/fail for {currentSubdomain.replace('_', ' ')} without saving to DB.</p>
      </div>
      <div className="flex justify-center space-x-4">
        <Button 
          variant="secondary" 
          onClick={() => handleSimulate(false)}
          disabled={loading}
          className="text-danger-600 border-danger-200 hover:bg-danger-50"
        >
          Simulate Fail
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => handleSimulate(true)}
          disabled={loading}
          className="text-success-600 border-success-200 hover:bg-success-50"
        >
          Simulate Pass
        </Button>
      </div>
    </div>
  );
}
