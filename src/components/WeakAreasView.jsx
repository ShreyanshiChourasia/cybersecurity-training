import { useState } from 'react';
import { RECOMMENDED_COURSES } from '../data/courseData';
import { 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  ExternalLink,
  ArrowRight,
  BarChart3
} from 'lucide-react';

const TOPIC_MAP = {
  phishing: 'Phishing Awareness',
  passwords: 'Password Hygiene',
  social_engineering: 'Social Engineering',
  data_handling: 'Data Handling',
  incident_reporting: 'Incident Reporting'
};

export default function WeakAreasView({ 
  masteryScores = {}, 
  onNavigate
}) {
  const [completedCourses, setCompletedCourses] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleCourseCompletion = (courseId) => {
    setCompletedCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const weakTopicKeys = Object.entries(masteryScores)
    .filter(([, score]) => score < 0.50)
    .map(([k]) => TOPIC_MAP[k] || k);

  const categoriesToDisplay = selectedCategory === 'all'
    ? Object.values(TOPIC_MAP)
    : [selectedCategory];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
              Screen 3: Targeted Remediation
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {weakTopicKeys.length} Vulnerabilit{weakTopicKeys.length === 1 ? 'y' : 'ies'} Flagged
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Targeted Skill Recommendations</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Custom micro-courses tailored to close diagnosed competency gaps. Mark modules complete as you progress.
          </p>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-indigo-600/30 cursor-pointer flex-shrink-0"
        >
          <BarChart3 className="w-4 h-4" />
          <span>View Manager ROI Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-400 font-medium mr-1">Filter by Domain:</span>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
            selectedCategory === 'all'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          All Domains
        </button>

        {Object.values(TOPIC_MAP).map((topicName) => {
          const isFlagged = weakTopicKeys.includes(topicName);
          return (
            <button
              key={topicName}
              onClick={() => setSelectedCategory(topicName)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border flex items-center gap-1.5 ${
                selectedCategory === topicName
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{topicName}</span>
              {isFlagged && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {categoriesToDisplay.map((topicName) => {
          const courses = RECOMMENDED_COURSES[topicName] || [];
          const isTopicVulnerable = weakTopicKeys.includes(topicName);

          return (
            <div
              key={topicName}
              className={`p-6 rounded-3xl border transition shadow-lg ${
                isTopicVulnerable
                  ? 'bg-slate-900/90 border-rose-500/40 ring-1 ring-rose-500/20'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <BookOpen className={`w-4 h-4 ${isTopicVulnerable ? 'text-rose-400' : 'text-indigo-400'}`} />
                  <h3 className="font-bold text-base text-white">{topicName}</h3>
                </div>

                {isTopicVulnerable ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                    <ShieldAlert className="w-3 h-3" /> Action Required (Diagnostic Gap)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                    <CheckCircle2 className="w-3 h-3" /> Baseline Met (Optional Upskilling)
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {courses.map((course) => {
                  const isDone = completedCourses[course.id] || false;

                  return (
                    <div
                      key={course.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-slate-950/40 border-emerald-500/30 opacity-70'
                          : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleCourseCompletion(course.id)}
                          className="w-5 h-5 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
                          title="Mark module complete"
                        />
                        <div>
                          <p className={`text-sm font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {course.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {course.platform} • Est. Time: <span className="font-mono text-slate-300">{course.duration}</span>
                          </p>
                        </div>
                      </div>

                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer shadow-md ${
                          isDone
                            ? 'bg-slate-800 text-slate-400 hover:text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                        }`}
                      >
                        <span>{isDone ? 'Review Course' : 'Open Course'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 cursor-pointer"
        >
          <span>Step 4: Proceed to Manager ROI Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
