import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock, DollarSign, ShieldCheck, TrendingUp, Users, Award, Download, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DashboardView({ domainState, onNavigateToQuiz, onNavigateToRemediation }) {
  const [teamSize, setTeamSize] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(40);

  // Dynamic calculations based on BKT skip-logic
  const hoursSavedPerEmployee = 4.5;
  const totalHoursSaved = Math.round(teamSize * hoursSavedPerEmployee);
  const totalFinancialSavings = totalHoursSaved * hourlyRate;
  const simulatedBreachRiskReduction = 72; // %

  // Transform domainState into Radar Chart data
  const radarChartData = [
    {
      subject: 'Phishing',
      teamScore: Math.round((domainState['Phishing Awareness']?.p_know ?? 0.72) * 100),
      benchmark: 85,
      fullMark: 100
    },
    {
      subject: 'Passwords',
      teamScore: Math.round((domainState['Password Hygiene']?.p_know ?? 0.85) * 100),
      benchmark: 90,
      fullMark: 100
    },
    {
      subject: 'Social Eng.',
      teamScore: Math.round((domainState['Social Engineering']?.p_know ?? 0.45) * 100),
      benchmark: 80,
      fullMark: 100
    },
    {
      subject: 'Data Handling',
      teamScore: Math.round((domainState['Confidential Data Handling']?.p_know ?? 0.60) * 100),
      benchmark: 75,
      fullMark: 100
    },
    {
      subject: 'Incident Rep.',
      teamScore: Math.round((domainState['Incident Reporting & SLA']?.p_know ?? 0.35) * 100),
      benchmark: 80,
      fullMark: 100
    }
  ];

  const overallAverage = Math.round(
    radarChartData.reduce((acc, cur) => acc + cur.teamScore, 0) / radarChartData.length
  );

  return (
    <div className="space-y-8 py-4">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-400 border border-indigo-800 mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Executive Analytics & Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Skill-Gap Radar & ROI Forecaster
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real-time measurement of workforce competency against industry standards and quantifiable cost savings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Aggregate Mastery</span>
              <span className={`text-xl font-mono font-black ${
                overallAverage >= 80 ? 'text-emerald-400' : overallAverage >= 60 ? 'text-cyan-400' : 'text-rose-400'
              }`}>
                {overallAverage}%
              </span>
            </div>
          </div>
        </div>

        {/* Dual Column: Radar Chart & ROI Forecaster */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          
          {/* Radar Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  5-Axis Competency Radar
                </h3>
                <p className="text-xs text-slate-400">Live Learner Profile vs Industry Benchmark</p>
              </div>
              
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Learner
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Benchmark
                </span>
              </div>
            </div>

            <div className="h-72 w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarChartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 9 }} />
                  <Radar name="Learner Score" dataKey="teamScore" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.35} />
                  <Radar name="Benchmark" dataKey="benchmark" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time-to-Productivity ROI Forecaster */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Time-to-Productivity ROI Simulator</h3>
              <p className="text-xs text-slate-400 mb-6">
                Calculates hours and budget reclaimed by skipping already-mastered concepts through BKT diagnostics.
              </p>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      Workforce Cohort Size (Learners):
                    </span>
                    <span className="font-mono font-bold text-cyan-400 text-sm">{teamSize} Employees</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={teamSize}
                    onChange={e => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-2">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      Average Hourly Wage:
                    </span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">${hourlyRate} / hr</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="150"
                    step="5"
                    value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Metric KPI Output Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Hours Reclaimed
                </div>
                <div className="text-xl font-bold font-mono text-cyan-400">{totalHoursSaved.toLocaleString()} hrs</div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">4.5h per employee</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Financial Savings
                </div>
                <div className="text-xl font-bold font-mono text-emerald-400">${totalFinancialSavings.toLocaleString()}</div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Direct wage ROI</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  Risk Mitigation
                </div>
                <div className="text-xl font-bold font-mono text-indigo-400">-{simulatedBreachRiskReduction}%</div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Phishing click drop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Granular Sub-domain Competency Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Subdomain Competency Matrix</h3>
            <p className="text-xs text-slate-400">Detailed breakdown of prior parameters and remediation status.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Sub-Domain</th>
                <th className="py-3 px-4">BKT Prior P(L_0)</th>
                <th className="py-3 px-4">Slip P(S)</th>
                <th className="py-3 px-4">Guess P(G)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {Object.entries(domainState).map(([name, data]) => {
                const score = Math.round(data.p_know * 100);
                const isProficient = score >= 80;

                return (
                  <tr key={name} className="hover:bg-slate-850/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">{name}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400 font-bold">{score}%</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{(data.p_slip ?? 0.10).toFixed(2)}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{(data.p_guess ?? 0.20).toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isProficient
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {isProficient ? 'Mastered' : 'Needs Focus'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isProficient ? (
                        <button
                          onClick={() => onNavigateToQuiz()}
                          className="text-slate-400 hover:text-white text-xs font-semibold underline"
                        >
                          Maintain Mastery
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigateToRemediation(name)}
                          className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded-lg text-xs font-semibold transition"
                        >
                          Fix Gaps →
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}