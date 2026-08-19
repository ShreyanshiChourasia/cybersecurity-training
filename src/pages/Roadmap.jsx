import { useState, useEffect } from 'react';
import { getMasteryState } from '../api/assessmentApi';
import { SUBDOMAINS } from '../api/config';
import { SkillTree } from '../components/roadmap/SkillTree';
import { WhatIfSimulator } from '../components/roadmap/WhatIfSimulator';
import { WeaknessTrace } from '../components/roadmap/WeaknessTrace';
import { LoadingState } from '../components/common/LoadingState';
import { Map } from 'lucide-react';

export function Roadmap({ userId = "mock_user_1" }) {
  const [masteryData, setMasteryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulationResult, setSimulationResult] = useState(null);

  const fetchMastery = async () => {
    try {
      setLoading(true);
      const data = await getMasteryState(userId);
      setMasteryData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMastery(); }, [userId]);

  const handleSimulationComplete = (result) => { setSimulationResult(result); };

  if (loading && !masteryData) {
    return <LoadingState message="Loading your training roadmap..." />;
  }

  const isStrugglingWithPhishing = masteryData?.mastery?.[SUBDOMAINS.PHISHING] < 0.5;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4 animate-slide-right">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Map className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Learning Roadmap</h1>
            <p className="text-sm text-slate-500">Your adaptive path through 5 cybersecurity domains.</p>
          </div>
        </div>
        <div className="animate-slide-up">
          <SkillTree masteryData={masteryData} />
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
        {isStrugglingWithPhishing && (
          <WeaknessTrace 
            currentTopic={SUBDOMAINS.PASSWORD_HYGIENE} 
            weakPrerequisite={SUBDOMAINS.PHISHING} 
          />
        )}
        
        <WhatIfSimulator 
          userId={userId} 
          currentSubdomain={SUBDOMAINS.SOCIAL_ENGINEERING}
          onSimulationComplete={handleSimulationComplete}
        />
        
        {simulationResult && (
          <div className="card p-4 text-sm bg-primary-50 text-primary-700 border-primary-200">
            <strong>Simulation Result:</strong> Mastery changed by {Object.values(simulationResult.simulated_mastery_change)[0] > 0 ? '+' : ''}
            {Object.values(simulationResult.simulated_mastery_change)[0]}. 
            <br/><span className="text-xs opacity-75">(Dry run: Database not updated)</span>
          </div>
        )}
      </div>
    </div>
  );
}
