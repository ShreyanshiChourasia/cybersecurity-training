import { useState, useEffect } from 'react';
import { getMasteryState } from '../api/assessmentApi';
import { fetchRecommendations } from '../api/recommendationApi';
import { SkillRadar } from '../components/dashboard/SkillRadar';
import { ROICalculator } from '../components/dashboard/ROICalculator';
import { JudgeDataDrawer } from '../components/dashboard/JudgeDataDrawer';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { Radio, Database, Users, TrendingUp, Award, Clock } from 'lucide-react';

export function Dashboard({ userId = "mock_user_1" }) {
  const [masteryData, setMasteryData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [mastery, recs] = await Promise.all([
          getMasteryState(userId),
          fetchRecommendations(userId)
        ]);
        setMasteryData(mastery);
        setRecommendations(recs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId]);

  if (loading && !masteryData) {
    return <LoadingState message="Loading Analytics Dashboard..." />;
  }

  // Calculate summary stats from mastery data
  const masteryValues = masteryData?.mastery ? Object.values(masteryData.mastery) : [];
  const avgMastery = masteryValues.length ? Math.round((masteryValues.reduce((a,b) => a+b, 0) / masteryValues.length) * 100) : 0;
  const completedDomains = masteryValues.filter(v => v >= 0.8).length;

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-slide-right">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <Radio className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics & ROI</h1>
            <p className="text-sm text-slate-500">Team skill gaps and adaptive learning outcomes.</p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2 text-xs">
          <Database className="w-4 h-4" /> Raw Data View
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: "Avg Mastery", value: `${avgMastery}%`, color: "bg-primary-50 text-primary-600", valueColor: avgMastery >= 75 ? 'text-success-600' : avgMastery >= 50 ? 'text-warning-600' : 'text-danger-600' },
          { icon: Award, label: "Domains Mastered", value: `${completedDomains}/5`, color: "bg-emerald-50 text-emerald-600", valueColor: 'text-slate-900' },
          { icon: Users, label: "Active Learners", value: "24", color: "bg-violet-50 text-violet-600", valueColor: 'text-slate-900' },
          { icon: Clock, label: "Hours Saved", value: "108", color: "bg-accent-50 text-accent-600", valueColor: 'text-slate-900' },
        ].map((s, i) => (
          <div key={i} className="stat-card animate-slide-up" style={{animationDelay: `${0.1*i}s`}}>
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <span className={`text-2xl font-extrabold ${s.valueColor} mt-2`}>{s.value}</span>
            <span className="text-xs text-slate-500 font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
        <div className="card p-6 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-1">Team Skill Radar</h3>
          <p className="text-xs text-slate-500 mb-4">Aggregated mastery across all 5 cybersecurity domains.</p>
          <div className="flex-1 min-h-[300px]">
            <SkillRadar masteryData={masteryData} />
          </div>
        </div>
        <div>
          <ROICalculator />
        </div>
      </div>

      {/* Recommended Content */}
      <div className="card animate-slide-up" style={{animationDelay: '0.4s'}}>
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recommended Training Courses</h3>
          <span className="badge-blue text-[10px]">{recommendations?.recommended_courses?.length || 0} courses</span>
        </div>
        <div className="p-0">
          <ul className="divide-y divide-slate-100">
            {recommendations?.recommended_courses?.map((course) => (
              <li key={course.course_id} className="p-5 hover:bg-slate-50/50 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-800">{course.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="badge-blue text-[10px]">{course.subdomain.replace('_', ' ').toUpperCase()}</span>
                      <span className="badge-slate text-[10px]">Difficulty: {course.difficulty}/5</span>
                      <span className="badge-slate text-[10px]">{course.est_duration_min} min</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="text-xs shrink-0">Assign</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <JudgeDataDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
