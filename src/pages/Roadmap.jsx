import { useState, useEffect } from 'react';
import { getMasteryState } from '../api/assessmentApi';
import { SUBDOMAINS } from '../api/config';
import { SkillTree } from '../components/roadmap/SkillTree';
import { WhatIfSimulator } from '../components/roadmap/WhatIfSimulator';
import { WeaknessTrace } from '../components/roadmap/WeaknessTrace';
import { LoadingState } from '../components/common/LoadingState';

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

  useEffect(() => {
    fetchMastery();
  }, [userId]);

  const handleSimulationComplete = (result) => {
    setSimulationResult(result);
    // In a real app, this might momentarily reflect on the UI 
    // without permanently altering the DB. Here we just show a toast/alert.
  };

  if (loading && !masteryData) {
    return <LoadingState message="Loading your training roadmap..." />;
  }

  // Example weakness trace if Phishing score is low but they are doing Password Hygiene
  const isStrugglingWithPhishing = masteryData?.mastery?.[SUBDOMAINS.PHISHING] < 0.5;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8">
      
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Learning Roadmap</h1>
          <p className="text-slate-500 text-sm">Your adaptive path through the five core cybersecurity subdomains.</p>
        </div>

        <SkillTree masteryData={masteryData} />
      </div>

      <div className="w-full md:w-80 space-y-6">
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
          <div className="p-4 text-sm bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
            <strong>Simulation Result:</strong> Mastery changed by {Object.values(simulationResult.simulated_mastery_change)[0] > 0 ? '+' : ''}
            {Object.values(simulationResult.simulated_mastery_change)[0]}. 
            <br/><span className="text-xs opacity-75">(Dry run: Database not updated)</span>
          </div>
        )}
      </div>

    </div>
  );
}
