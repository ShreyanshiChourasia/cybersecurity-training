import React, { useState } from 'react';
import { RECOMMENDED_COURSES } from '../data/courseData';

export default function WeakAreasView({ 
  userWeakTopics = ["Phishing Awareness", "Social Engineering", "Incident Reporting"],
  selectedTopic = null,
  onClose = null
}) {
  const [completedCourses, setCompletedCourses] = useState({});

  const toggleCourseCompletion = (courseId) => {
    setCompletedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const displayTopics = selectedTopic 
    ? [selectedTopic] 
    : userWeakTopics;

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-800 relative">
      
      {/* Close button jab Modal/Popup flow me khule */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-semibold px-3 py-1 bg-slate-800 rounded-lg border border-slate-700"
        >
          ✕ Close
        </button>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Personalized Skill Recommendations</h2>
        <p className="text-slate-400 text-sm mt-1">
          Review your flagged sub-domains below and complete the recommended learning modules.
        </p>
      </div>

      {displayTopics.length === 0 ? (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg">
          Great job! All assessment topics show strong mastery.
        </div>
      ) : (
        <div className="space-y-6">
          {displayTopics.map((topic, index) => {
            const courses = RECOMMENDED_COURSES[topic] || [];
            return (
              <div key={index} className="p-5 bg-slate-800/80 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-rose-400">
                    Needs Focus: {topic}
                  </h3>
                  <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full font-medium">
                    Remediation Required
                  </span>
                </div>

                <div className="space-y-3">
                  {courses.length > 0 ? (
                    courses.map((course) => {
                      const isDone = completedCourses[course.id] || false;
                      return (
                        <div 
                          key={course.id} 
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                            isDone 
                              ? 'bg-slate-900/40 border-emerald-500/40 opacity-70' 
                              : 'bg-slate-900/90 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => toggleCourseCompletion(course.id)}
                              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                            />
                            <div>
                              <p className={`font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                {course.title}
                              </p>
                              <p className="text-xs text-slate-400">
                                {course.platform} • Est. Time: {course.duration}
                              </p>
                            </div>
                          </div>

                          <a
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded transition-colors"
                          >
                            Open Course →
                          </a>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-slate-400">No additional courses required for this module.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}