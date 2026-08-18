import { useState, useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { DollarSign, Clock, Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';

export default function DashboardView({ masteryScores = {}, masteredCount = 0, currentUser }) {
  const [learners, setLearners] = useState(250);
  const [hourlyWage, setHourlyWage] = useState(65);

  // 1. Dynamically compute the Radar dataset whenever masteryScores changes
  const radarData = useMemo(() => {
    return [
      {
        subject: 'Phishing',
        score: Math.round((masteryScores.phishing ?? 0.20) * 100),
        fullMark: 100,
      },
      {
        subject: 'Zero-Trust MFA',
        score: Math.round((masteryScores.passwords ?? 0.20) * 100),
        fullMark: 100,
      },
      {
        subject: 'Social Defense',
        score: Math.round((masteryScores.social_engineering ?? 0.20) * 100),
        fullMark: 100,
      },
      {
        subject: 'Data Handling',
        score: Math.round((masteryScores.data_handling ?? 0.20) * 100),
        fullMark: 100,
      },
      {
        subject: 'Incident Escalation',
        score: Math.round((masteryScores.incident_reporting ?? 0.20) * 100),
        fullMark: 100,
      },
    ];
  }, [masteryScores]);

  // 2. Real-time dynamic ROI metrics directly linked to quiz mastery
  const totalModules = 5;
  const hoursPerModule = 1.25;
  const hoursSavedPerLearner = masteredCount * hoursPerModule;
  const totalHoursSaved = Math.round(hoursSavedPerLearner * learners);
  const totalCostSaved = totalHoursSaved * hourlyWage;
  const efficiencyMultiplier = (1 + (masteredCount / totalModules) * 0.8).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top 3 Live ROI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>TOTAL ESTIMATED SAVINGS</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2 font-mono">
            ${totalCostSaved.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Reclaimed from {masteredCount} bypassed modules
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>TRAINING TIME SAVED</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-2 font-mono">
            {totalHoursSaved.toLocaleString()} hrs
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {hoursSavedPerLearner.toFixed(1)} hrs saved per employee
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>LEARNING VELOCITY</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-2 font-mono">
            {efficiencyMultiplier}x Speed
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {masteredCount} of {totalModules} competencies cleared
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Dynamic Radar Chart */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between backdrop-blur shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-white text-sm">Vulnerability & Competence Radar</h3>
              <span className="text-xs text-indigo-400 font-semibold">{currentUser?.name || 'Active Learner'}</span>
            </div>
            <p className="text-xs text-slate-400">Live multi-domain posture reflecting quiz results</p>
          </div>

          <div className="w-full h-64 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  stroke="#475569" 
                  tick={{ fill: '#64748b', fontSize: 9 }}
                />
                <Radar 
                  name="Mastery %" 
                  dataKey="score" 
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={0.5} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px', color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Department: <strong className="text-white">{currentUser?.department || 'Operations'}</strong></span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {masteredCount}/5 Modules Qualified
            </span>
          </div>
        </div>

        {/* Interactive Corporate ROI Modeler */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur flex flex-col justify-between space-y-5 shadow-xl">
          <div>
            <h3 className="font-bold text-white text-sm">Corporate ROI Modeler</h3>
            <p className="text-xs text-slate-400 mt-0.5">Adjust organization size to project real-time payroll savings</p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" /> Organization Headcount
                </span>
                <span className="font-mono text-indigo-400">{learners} employees</span>
              </div>
              <input
                type="range"
                min="20"
                max="1500"
                step="10"
                value={learners}
                onChange={(e) => setLearners(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" /> Average Hourly Rate
                </span>
                <span className="font-mono text-emerald-400">${hourlyWage}/hr</span>
              </div>
              <input
                type="range"
                min="25"
                max="200"
                step="5"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            💡 <strong className="text-slate-200">Adaptive Efficiency Principle:</strong> CyberAdapt automatically eliminates mandatory video training for topics employees already understand, routing curriculum exclusively to detected skill gaps.
          </div>
        </div>
      </div>
    </div>
  );
}