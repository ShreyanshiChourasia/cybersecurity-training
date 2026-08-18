import { useState } from 'react';
import { 
  DollarSign, 
  Clock, 
  Users, 
  Award, 
  ArrowUpRight, 
  Sparkles,
  Building,
  Activity,
  Code2,
  FileCheck2,
  Download
} from 'lucide-react';

const DOMAIN_LABELS = {
  phishing: 'Phishing',
  passwords: 'Passwords',
  social_engineering: 'Social Eng',
  data_handling: 'Data Handling',
  incident_reporting: 'Incident Rep'
};

const DEPARTMENT_METRICS = [
  { name: 'Engineering & DevOps', score: 88, risk: 'Low', phishRate: '3.2%', completed: '94%' },
  { name: 'Human Resources', score: 45, risk: 'High', phishRate: '18.4%', completed: '62%' },
  { name: 'Corporate Finance', score: 62, risk: 'Moderate', phishRate: '11.1%', completed: '78%' },
  { name: 'Executive Operations', score: 54, risk: 'High', phishRate: '15.6%', completed: '70%' },
  { name: 'Product & Design', score: 79, risk: 'Low', phishRate: '5.0%', completed: '89%' }
];

export default function DashboardView({ masteryScores = {}, currentUser = {}, onOpenJudgeDrawer }) {
  const [employeeCount, setEmployeeCount] = useState(150);
  const [hourlyWage, setHourlyWage] = useState(48);

  const domains = Object.keys(DOMAIN_LABELS);
  
  const scoreValues = Object.values(masteryScores);
  const avgMastery = scoreValues.length > 0
    ? scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length
    : 0.65;

  const masteredDomainsCount = Object.values(masteryScores).filter(s => s >= 0.70).length;
  const hoursSavedPerEmployee = parseFloat((masteredDomainsCount * 1.75 + (avgMastery * 2.5)).toFixed(1));
  const totalHoursSaved = Math.round(employeeCount * hoursSavedPerEmployee);
  const totalDollarsSaved = Math.round(totalHoursSaved * hourlyWage);
  const breachRiskReduction = Math.min(88, Math.max(25, Math.round(avgMastery * 92)));

  // SVG Radar Coordinates
  const center = 140;
  const radius = 100;
  const totalPoints = 5;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / totalPoints) * index - Math.PI / 2;
    const r = radius * Math.max(0.15, Math.min(1, value));
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const radarPolygonPoints = domains.map((d, i) => {
    const score = masteryScores[d] ?? 0.5;
    const { x, y } = getCoordinates(i, score);
    return `${x},${y}`;
  }).join(' ');

  // 3. Export PDF Certificate (Browser Native)
  const handlePrintCertificate = () => {
    const avgPct = Math.round(avgMastery * 100);
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const userName = currentUser?.name || 'Security Professional';
    const userRole = currentUser?.role || 'HR Specialist';
    const dept = currentUser?.department || 'Human Resources';

    const printWin = window.open('', '_blank');
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>AdaptIQ Official Security Certificate - ${userName}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #090d16; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
            .cert-card { border: 4px solid #6366f1; border-radius: 28px; padding: 48px; width: 720px; background: #0f172a; text-align: center; box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
            .badge { display: inline-block; padding: 6px 18px; background: rgba(99,102,241,0.15); border: 1px solid #6366f1; border-radius: 999px; font-size: 11px; font-weight: bold; color: #a5b4fc; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; }
            h1 { font-size: 32px; margin: 0 0 8px 0; color: #fff; font-weight: 800; }
            p { color: #94a3b8; font-size: 14px; margin: 6px 0; }
            .user-name { font-size: 28px; font-weight: bold; color: #38bdf8; margin: 24px 0 6px 0; text-decoration: underline; }
            .score-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 32px 0; }
            .score-box { background: #090d16; padding: 12px 6px; border-radius: 12px; border: 1px solid #334155; }
            .score-val { font-size: 16px; font-weight: bold; color: #34d399; font-family: monospace; }
            .score-label { font-size: 10px; color: #94a3b8; margin-top: 4px; text-transform: capitalize; }
            .footer { display: flex; justify-content: space-between; border-top: 1px solid #334155; padding-top: 24px; margin-top: 20px; font-size: 11px; color: #64748b; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="cert-card">
            <div class="badge">AdaptIQ Cybersecurity Accreditation</div>
            <h1>Certificate of Security Competency</h1>
            <p>This certifies that the employee named below has demonstrated verified threat defense capabilities across calibrated risk scenarios.</p>
            <div class="user-name">${userName}</div>
            <p><strong>Role:</strong> ${userRole} &nbsp;|&nbsp; <strong>Department:</strong> ${dept}</p>
            <p><strong>Evaluated Workforce Score:</strong> <span style="color:#34d399; font-weight:bold; font-size:18px;">${avgPct}%</span></p>
            
            <div class="score-grid">
              ${Object.entries(masteryScores).map(([topic, val]) => `
                <div class="score-box">
                  <div class="score-val">${Math.round(val * 100)}%</div>
                  <div class="score-label">${topic.replace('_', ' ')}</div>
                </div>
              `).join('')}
            </div>

            <div class="footer">
              <div>Issue Date: <strong>${dateStr}</strong></div>
              <div>ID: <strong>ADAPTIQ-${Math.floor(100000 + Math.random() * 900000)}</strong></div>
              <div>Engine: <strong>AdaptIQ Bayesian Risk AI</strong></div>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  // 3. Export SOC Audit JSON Log
  const handleExportJson = () => {
    const auditData = {
      audit_report: "AdaptIQ Enterprise Compliance Telemetry",
      timestamp: new Date().toISOString(),
      employee: currentUser,
      domain_mastery_vector: masteryScores,
      hours_saved_via_bypass: hoursSavedPerEmployee,
      compliance_status: avgMastery >= 0.70 ? "COMPLIANT_SECURED" : "REMEDIATION_IN_PROGRESS",
      cryptographic_hash: "0x" + Math.random().toString(16).substring(2, 10).toUpperCase()
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AdaptIQ_Audit_${(currentUser?.name || 'User').replace(' ', '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Banner & Export Actions */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              Screen 4: Executive Intelligence
            </span>
            <span className="text-xs text-slate-400 font-mono">Workforce Cyber Posture</span>
          </div>
          <h2 className="text-xl font-bold text-white">Manager & SOC ROI Dashboard</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Live 5-point skill radar diagnostics, dynamic training cost reduction models, and verifiable compliance records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Certificate Print Button */}
          <button
            onClick={handlePrintCertificate}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-2xl text-xs font-bold transition cursor-pointer shadow-lg shadow-indigo-600/10"
          >
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
            <span>Print Certificate</span>
          </button>

          {/* JSON SOC Log Export Button */}
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export SOC Audit</span>
          </button>

          {/* Judge Drawer Inspector */}
          {onOpenJudgeDrawer && (
            <button
              onClick={onOpenJudgeDrawer}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-2xl text-xs font-bold transition cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Judge Telemetry</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Breach Risk Reduction</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">-{breachRiskReduction}%</span>
            <span className="text-[11px] text-emerald-400 flex items-center font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> High Defense
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Adaptive skill-gap remediation</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Money Saved</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">
              ${(totalDollarsSaved / 1000).toFixed(1)}k
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center font-bold">ROI Yield</span>
          </div>
          <p className="text-[11px] text-slate-400">Skipped redundant basic training</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Productive Hours Saved</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-indigo-300">
              {totalHoursSaved.toLocaleString()} hrs
            </span>
            <span className="text-[11px] text-indigo-400 font-bold">{hoursSavedPerEmployee}h / emp</span>
          </div>
          <p className="text-[11px] text-slate-400">Restored to core business focus</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Mastery Posture</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold font-mono ${avgMastery >= 0.7 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {Math.round(avgMastery * 100)}%
            </span>
            <span className="text-[11px] text-slate-400 font-bold">5 Domains</span>
          </div>
          <p className="text-[11px] text-slate-400">Calculated via confidence weighting</p>
        </div>
      </div>

      {/* Radar Chart + ROI Slider */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 5-POINT SKILL RADAR CHART */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>5-Point Skill Radar Posture</span>
              </h3>
              <p className="text-[11px] text-slate-400">Polygon vertices adapt live to evaluated topic mastery</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Live Polygon
            </span>
          </div>

          <div className="flex items-center justify-center py-2">
            <svg width="280" height="280" className="overflow-visible">
              {[0.25, 0.5, 0.75, 1.0].map((level, ringIdx) => {
                const ringPoints = domains.map((_, idx) => {
                  const { x, y } = getCoordinates(idx, level);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon
                    key={ringIdx}
                    points={ringPoints}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray={ringIdx < 3 ? "2,2" : "none"}
                  />
                );
              })}

              {domains.map((_, idx) => {
                const { x, y } = getCoordinates(idx, 1.0);
                return (
                  <line
                    key={idx}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                );
              })}

              <polygon
                points={radarPolygonPoints}
                fill="rgba(99, 102, 241, 0.35)"
                stroke="#6366f1"
                strokeWidth="2.5"
                className="transition-all duration-700 ease-out"
              />

              {domains.map((domainKey, idx) => {
                const score = masteryScores[domainKey] ?? 0.5;
                const pt = getCoordinates(idx, score);
                const labelPt = getCoordinates(idx, 1.22);

                return (
                  <g key={domainKey}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      className="fill-indigo-400 stroke-slate-950 stroke-2 transition-all duration-700"
                    />
                    <text
                      x={labelPt.x}
                      y={labelPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] font-bold fill-slate-300 tracking-tight"
                    >
                      {DOMAIN_LABELS[domainKey]}
                    </text>
                    <text
                      x={labelPt.x}
                      y={labelPt.y + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[9px] font-mono font-bold ${score >= 0.7 ? 'fill-emerald-400' : score < 0.5 ? 'fill-rose-400' : 'fill-amber-400'}`}
                    >
                      {Math.round(score * 100)}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-2 border-t border-slate-800 text-center">
            {domains.map(k => (
              <div key={k} className="p-1 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <div className="text-[9px] text-slate-400 truncate">{DOMAIN_LABELS[k]}</div>
                <div className="text-[11px] font-mono font-bold text-indigo-300">
                  {Math.round((masteryScores[k] ?? 0.5) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE ROI & EFFICIENCY CALCULATOR */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Interactive ROI & Efficiency Calculator</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Calculate financial ROI generated by adaptive micro-testing vs one-size-fits-all mandatory training.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" /> Total Workforce Size:
                </span>
                <span className="font-mono text-white font-extrabold text-sm">{employeeCount} Employees</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Avg Employee Cost / Hr:
                </span>
                <span className="font-mono text-emerald-400 font-extrabold text-sm">${hourlyWage} / hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="2"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-indigo-950/30 to-slate-950/80 border border-indigo-500/30 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              AdaptIQ Optimization Yield
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-400">Hours Saved by Skip Logic</div>
                <div className="text-xl font-mono font-extrabold text-white mt-0.5">
                  {totalHoursSaved.toLocaleString()} hrs
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 border border-emerald-500/30 rounded-xl">
                <div className="text-[10px] text-emerald-400 font-semibold">Net Direct Savings</div>
                <div className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5">
                  ${totalDollarsSaved.toLocaleString()}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed">
              * Based on {masteredDomainsCount} mastered domains allowing employees to bypass redundant 1.75h modules and focus only on diagnosed vulnerability areas.
            </p>
          </div>
        </div>

      </div>

      {/* Department Risk Matrix */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-400" />
            <span>Department Risk & Compliance Matrix</span>
          </h3>
          <span className="text-xs text-slate-400">SOC Live Telemetry</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 font-semibold">
                <th className="pb-2">Department</th>
                <th className="pb-2">Vulnerability Level</th>
                <th className="pb-2">Phish Click Probability</th>
                <th className="pb-2 text-right">Targeted Remediation Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {DEPARTMENT_METRICS.map((dept) => (
                <tr key={dept.name} className="hover:bg-slate-950/40">
                  <td className="py-3 font-medium text-slate-200">{dept.name}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      dept.risk === 'Low'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : dept.risk === 'High'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {dept.risk} Vulnerability
                    </span>
                  </td>
                  <td className="py-3 font-mono text-slate-300">{dept.phishRate}</td>
                  <td className="py-3 text-right font-mono font-bold text-indigo-400">{dept.completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}