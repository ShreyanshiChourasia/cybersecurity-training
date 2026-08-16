import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Clock, DollarSign, ShieldCheck } from 'lucide-react';
import { radarData } from '../mockData';

export default function DashboardView() {
  const [teamSize, setTeamSize] = useState(25);
  const [hourlyRate, setHourlyRate] = useState(35);

  const hoursSavedPerEmployee = 4.5;
  const totalHoursSaved = Math.round(teamSize * hoursSavedPerEmployee);
  const totalFinancialSavings = totalHoursSaved * hourlyRate;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white my-4">
      {/* 5-Axis Radar Chart */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          Skill-Gap Radar
        </h3>
        <p className="text-xs text-slate-400 mb-4">Team Mastery vs Target Benchmark</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Radar name="Team Score" dataKey="teamScore" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} />
              <Radar name="Benchmark" dataKey="benchmark" stroke="#818cf8" fill="#818cf8" fillOpacity={0.1} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI & Productivity Forecaster */}
      <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-6 pt-4 lg:pt-0">
        <div>
          <h3 className="text-lg font-bold mb-1">Time-to-Productivity ROI</h3>
          <p className="text-xs text-slate-400 mb-6">Quantifiable business impact from adaptive skip logic</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Team Size (Learners):</span>
                <span className="font-bold text-indigo-400">{teamSize}</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={teamSize}
                onChange={e => setTeamSize(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Avg. Hourly Wage ($):</span>
                <span className="font-bold text-indigo-400">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                value={hourlyRate}
                onChange={e => setHourlyRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Clock className="w-4 h-4 text-sky-400" />
              Hours Saved
            </div>
            <div className="text-2xl font-bold text-sky-400">{totalHoursSaved} hrs</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Total Savings
            </div>
            <div className="text-2xl font-bold text-emerald-400">${totalFinancialSavings.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}