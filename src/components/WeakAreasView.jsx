import React, { useState } from 'react';
import { RECOMMENDED_COURSES } from '../data/courseData';
import { BookOpen, CheckCircle, ExternalLink, Clock, Sparkles, Filter, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WeakAreasView({ 
  domainState, 
  selectedTopic = null,
  onCourseToggle,
  completedCourses = {},
  onNavigateToQuiz 
}) {
  const [filterTopic, setFilterTopic] = useState(selectedTopic || 'all');
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Identify weak topics where p_know < 0.80
  const allDomainNames = Object.keys(domainState);
  const weakTopics = allDomainNames.filter(name => (domainState[name]?.p_know ?? 0) < 0.80);

  const displayTopics = filterTopic === 'all' 
    ? (weakTopics.length > 0 ? weakTopics : allDomainNames) 
    : [filterTopic];

  const totalCoursesCount = displayTopics.reduce((acc, topic) => acc + (RECOMMENDED_COURSES[topic]?.length || 0), 0);
  const completedCount = displayTopics.reduce((acc, topic) => {
    const list = RECOMMENDED_COURSES[topic] || [];
    return acc + list.filter(c => completedCourses[c.id]).length;
  }, 0);

  const progressPercent = totalCoursesCount > 0 ? Math.round((completedCount / totalCoursesCount) * 100) : 0;

  const handleToggle = (course, topic) => {
    const willBeDone = !completedCourses[course.id];
    onCourseToggle(course.id, topic, willBeDone);

    if (willBeDone) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-8 py-4">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Content-Based Recommendation Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Personalized Remediation Hub
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Bite-sized, 10–18 minute interactive training modules automatically matched to your BKT skill gaps.
            </p>
          </div>

          <button
            onClick={() => onNavigateToQuiz()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            Take Post-Remediation Quiz <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Metric Bar */}
        <div className="mt-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-slate-400">Remediation Roadmap Progress:</span>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">{completedCount} of {totalCoursesCount} modules completed</span>
              <span className="text-xs text-slate-500 font-normal">({progressPercent}%)</span>
            </div>
          </div>

          <div className="w-full sm:w-64 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-6 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setFilterTopic('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterTopic === 'all'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Weak Sub-Domains ({weakTopics.length})
          </button>

          {allDomainNames.map(name => {
            const isSelected = filterTopic === name;
            const score = Math.round((domainState[name]?.p_know ?? 0.5) * 100);
            return (
              <button
                key={name}
                onClick={() => setFilterTopic(name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{name}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  score >= 80 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                }`}>
                  {score}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses List by Topic */}
      <div className="space-y-6">
        {displayTopics.map((topic) => {
          const courses = RECOMMENDED_COURSES[topic] || [];
          const domainInfo = domainState[topic] || { p_know: 0.5 };
          const masteryPercent = Math.round(domainInfo.p_know * 100);

          return (
            <div key={topic} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    masteryPercent >= 80 ? 'bg-emerald-400' : masteryPercent >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                  <div>
                    <h3 className="text-lg font-bold text-white">{topic}</h3>
                    <p className="text-xs text-slate-400">Current BKT Mastery: {masteryPercent}%</p>
                  </div>
                </div>

                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border w-fit ${
                  masteryPercent >= 80
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : 'bg-rose-950 text-rose-400 border-rose-800'
                }`}>
                  {masteryPercent >= 80 ? '✓ Proficient' : '⚠ Remediation Required'}
                </span>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => {
                  const isDone = !!completedCourses[course.id];

                  return (
                    <div
                      key={course.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-slate-950/40 border-emerald-500/40 opacity-80'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => handleToggle(course, topic)}
                            className="w-5 h-5 accent-emerald-500 rounded cursor-pointer mt-0.5"
                          />
                          <div>
                            <h4 className={`text-sm font-bold leading-snug ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                              {course.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{course.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Course Metadata & Skills */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-850">
                        {course.skills?.map((sk, i) => (
                          <span key={i} className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md">
                            {sk}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-850 text-xs">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span className="text-slate-500">{course.platform}</span>
                        </div>

                        <button
                          onClick={() => setActiveCourseModal(course)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 flex items-center gap-1 transition cursor-pointer"
                        >
                          Launch Course <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Interactive Course Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  {activeCourseModal.platform} • Micro-Learning
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activeCourseModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="text-xs text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg border border-slate-700"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-300 text-xs uppercase tracking-wider">Module Objectives & Syllabus:</h4>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li>Understand key vulnerability indicators and attack methodologies.</li>
                  <li>Real-world incident case studies and prevention checklists.</li>
                  <li>Hands-on interactive validation questions to reinforce memory retention.</li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-2xl text-xs text-emerald-300">
                💡 <strong>Adaptive Learning Tip:</strong> Completing this module automatically signals the BKT engine to upgrade your prior mastery probability.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  handleToggle(activeCourseModal, filterTopic === 'all' ? 'Social Engineering' : filterTopic);
                  setActiveCourseModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Module Completed
              </button>

              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
