import { useState, useEffect } from 'react';
import { BookOpen, PlayCircle, CheckCircle2 } from 'lucide-react';
import { fetchRecommendations } from '../api/recommendationApi';
import { LoadingState } from './common/LoadingState';
import { Button } from './common/Button';

export default function WeakAreasView({ onNavigateToQuiz, userId = "mock_user_1" }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations(userId).then(recs => {
      setRecommendations(recs);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <LoadingState message="Analyzing weaknesses and finding courses..." />;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-primary-600" />
          Remediation Hub
        </h1>
        <p className="text-slate-500 text-sm">Targeted micro-learning based on your recent skill gaps.</p>
      </div>

      <div className="space-y-4">
        {recommendations?.recommended_courses?.map((course) => (
          <div key={course.course_id} className="card p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase px-2 py-1 bg-danger-50 text-danger-600 rounded">Gap Detected</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">{course.subdomain.replace('_', ' ')}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{course.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{course.description}</p>
              <div className="flex gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center"><PlayCircle className="w-4 h-4 mr-1" /> {course.est_duration_min} mins</span>
                <span className="flex items-center">Difficulty: {course.difficulty}/5</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[140px]">
              <Button>Start Course</Button>
              <Button variant="secondary" onClick={onNavigateToQuiz}>Retake Quiz</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
