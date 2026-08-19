import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

export function SkillRadar({ masteryData }) {
  if (!masteryData || !masteryData.mastery) return null;

  const data = Object.entries(masteryData.mastery).map(([key, value]) => ({
    subject: key.replace('_', ' ').toUpperCase(),
    A: Math.round(value * 100),
    fullMark: 100,
  }));

  return (
    <div className="card w-full h-[400px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`${value}%`, 'Mastery']}
          />
          <Radar 
            name="Team Average" 
            dataKey="A" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.4} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
