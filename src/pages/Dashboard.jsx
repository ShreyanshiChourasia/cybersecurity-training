import { useState, useEffect } from 'react';
import { getMasteryState } from '../api/assessmentApi';
import { fetchRecommendations } from '../api/recommendationApi';
import { SkillRadar } from '../components/dashboard/SkillRadar';
import { ROICalculator } from '../components/dashboard/ROICalculator';
import { JudgeDataDrawer } from '../components/dashboard/JudgeDataDrawer';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';
import { Database } from 'lucide-react';

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
    return <LoadingState message="Loading Manager Dashboard..." />;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 relative">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Manager Dashboard</h1>
          <p className="text-slate-500 text-sm">Team skill gaps and adaptive learning ROI.</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center text-xs text-slate-500 hover:text-slate-700"
        >
          <Database className="w-4 h-4 mr-2" />
          Judge Data Drawer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Team Skill Radar</h3>
          <p className="text-sm text-slate-500 mb-4">Aggregated mastery across all 5 subdomains based on real-time BKT tracking.</p>
          <div className="flex-1 min-h-[300px]">
            <SkillRadar masteryData={masteryData} />
          </div>
        </div>

        <div>
          <ROICalculator />
        </div>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Top Recommended Content</h3>
        </div>
        <div className="p-0">
          <ul className="divide-y divide-slate-100">
            {recommendations?.recommended_courses?.map((course) => (
              <li key={course.course_id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-primary-700">{course.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{course.description}</p>
                    <div className="flex space-x-4 mt-3 text-xs font-medium text-slate-500">
                      <span className="bg-slate-100 px-2 py-1 rounded-md">{course.subdomain.replace('_', ' ').toUpperCase()}</span>
                      <span className="bg-slate-100 px-2 py-1 rounded-md">Diff: {course.difficulty}/5</span>
                      <span className="bg-slate-100 px-2 py-1 rounded-md">{course.est_duration_min} min</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="text-xs shrink-0 ml-4">Assign</Button>
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
