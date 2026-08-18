import { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, ArrowDown, Play, ShieldAlert, Sparkles, ChevronRight, X, ExternalLink, Wifi, WifiOff } from 'lucide-react';

async function fetchLessonsFromBackend() {
  try {
    const res = await fetch('http://localhost:8000/api/lessons', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { data, isLive: true };
  } catch {
    return { data: null, isLive: false };
  }
}

// Complete 5-Scope Direct MP4 Streams (Zero embed restrictions, instant playback)
const FALLBACK_MODULE_LESSONS = {
  phishing: {
    title: 'Phishing & Email Spoofing Defense',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    courseraUrl: 'https://www.coursera.org/learn/foundations-of-cybersecurity',
    courseraTitle: 'Google Cybersecurity: Foundations & Phishing Defense',
    summary: 'Inspect sender SMTP headers, verify top-level domains against lookalike spoofing, and isolate suspicious attachments before executing.'
  },
  passwords: {
    title: 'Zero-Trust Access & Hardware MFA',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    courseraUrl: 'https://www.coursera.org/learn/cyber-security-roles-processes-operating-system-security',
    courseraTitle: 'IBM: Access Control & Zero-Trust Authentication',
    summary: 'Enforce hardware-backed FIDO2/WebAuthn tokens over SMS OTPs to neutralize adversary-in-the-middle credential proxies.'
  },
  social_engineering: {
    title: 'Behavioral Social Defense & Pretexting',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    courseraUrl: 'https://www.coursera.org/learn/social-engineering-security',
    courseraTitle: 'Infosec: Social Engineering & Pretexting Countermeasures',
    summary: 'Execute out-of-band verification through established corporate channels whenever emergency financial wire transfers are requested.'
  },
  data_handling: {
    title: 'Classified Data Handling & Tokenization',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    courseraUrl: 'https://www.coursera.org/learn/data-security-privacy',
    courseraTitle: 'Vanderbilt: Data Privacy, Tokenization & Compliance',
    summary: 'Mask sensitive PII and credit records prior to transit. Never paste confidential corporate datasets into unapproved public AI tools.'
  },
  incident_reporting: {
    title: 'Critical Incident Escalation & SOC Forensics',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    courseraUrl: 'https://www.coursera.org/learn/incident-response',
    courseraTitle: 'Google Cybersecurity: Incident Response & Escalation',
    summary: 'Immediately disconnect network adapters to sever command-and-control communication while preserving volatile system RAM for forensics.'
  }
};

export default function RoadmapView({ masteryScores = {}, onSimulatePass, onSimulateFail, onNavigate }) {
  const [selectedTopic, setSelectedTopic] = useState('phishing');
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonsData, setLessonsData] = useState(FALLBACK_MODULE_LESSONS);
  const [isLiveApi, setIsLiveApi] = useState(false);

  useEffect(() => {
    async function loadLessons() {
      const { data, isLive } = await fetchLessonsFromBackend();
      if (data && typeof data === 'object') {
        setLessonsData(data);
        setIsLiveApi(isLive);
      }
    }
    loadLessons();
  }, []);

  const nodes = [
    { id: 'phishing', title: '1. Phishing & Spoofing Defense', score: masteryScores.phishing ?? 0.50, desc: 'Header inspection & spear-phishing payload identification' },
    { id: 'passwords', title: '2. Zero-Trust Access & MFA', score: masteryScores.passwords ?? 0.50, desc: 'FIDO2 security tokens, entropy, and credential rotation' },
    { id: 'social_engineering', title: '3. Behavioral Social Defense', score: masteryScores.social_engineering ?? 0.50, desc: 'Pretexting vectors & emergency authority impersonation' },
    { id: 'data_handling', title: '4. Classified Data Handling', score: masteryScores.data_handling ?? 0.50, desc: 'PII classification, encryption standards & exfiltration limits' },
    { id: 'incident_reporting', title: '5. Critical Incident Escalation', score: masteryScores.incident_reporting ?? 0.50, desc: 'SOC dispatch workflows & containment forensics' }
  ];

  const getNodeStatus = (score) => {
    if (score >= 0.80) return 'mastered';
    if (score <= 0.25) return 'needs_remediation';
    return 'active';
  };

  const hasPrerequisiteGap = (masteryScores.phishing ?? 0.50) <= 0.25 || (masteryScores.passwords ?? 0.50) <= 0.25;
  const failedAdvancedNode = (masteryScores.incident_reporting ?? 0.50) <= 0.25;
  const showTraceback = failedAdvancedNode && hasPrerequisiteGap;

  const currentLessonData = lessonsData[activeLesson] || FALLBACK_MODULE_LESSONS[activeLesson];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Simulator Header */}
      <div className="bg-slate-900/80 border border-indigo-500/30 p-5 rounded-2xl shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-bold text-white tracking-wide">Judge "What-If" Simulator</h4>
            {isLiveApi ? (
              <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <Wifi className="w-3 h-3" /> Live DB Links
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">
                <WifiOff className="w-3 h-3" /> Offline Set
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Simulate live passing/failing on any learning module</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="phishing">Phishing Defense</option>
            <option value="passwords">Zero-Trust & MFA</option>
            <option value="social_engineering">Social Defense</option>
            <option value="data_handling">Data Handling</option>
            <option value="incident_reporting">Incident Escalation</option>
          </select>

          <button
            onClick={() => onSimulatePass(selectedTopic)}
            className="px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            ✓ Pass (90%)
          </button>
          <button
            onClick={() => onSimulateFail(selectedTopic)}
            className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            ✕ Fail (25%)
          </button>
        </div>
      </div>

      {/* Weakness Traceback */}
      {showTraceback && (
        <div className="bg-gradient-to-r from-amber-950/70 to-rose-950/70 border border-amber-500/60 p-4 rounded-2xl flex items-center gap-3.5 text-amber-200 text-xs shadow-lg animate-pulse">
          <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 flex-shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold uppercase tracking-wider text-amber-300 block mb-0.5">Weakness Traceback Triggered</span>
            Incident Escalation failure traced back to foundational gaps in basic security principles. Prerequisite drills inserted.
          </div>
        </div>
      )}

      {/* 5-Node Learning Tree */}
      <div className="space-y-3 pt-2">
        {nodes.map((node, index) => {
          const status = getNodeStatus(node.score);
          return (
            <div key={node.id} className="relative">
              {index > 0 && (
                <div className="flex justify-center -my-2 py-1">
                  <ArrowDown className={`w-4 h-4 ${status === 'mastered' ? 'text-emerald-500/50' : 'text-slate-700'}`} />
                </div>
              )}

              <div
                onClick={() => status !== 'mastered' && setActiveLesson(node.id)}
                className={`p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md flex items-center justify-between gap-4 cursor-pointer ${
                  status === 'mastered'
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 cursor-default'
                    : status === 'needs_remediation'
                    ? 'bg-rose-950/30 border-rose-500 text-rose-200 ring-1 ring-rose-500/50 hover:bg-rose-900/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      status === 'mastered'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : status === 'needs_remediation'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {status === 'mastered' && <CheckCircle2 className="w-5 h-5" />}
                    {status === 'needs_remediation' && <AlertTriangle className="w-5 h-5" />}
                    {status === 'active' && <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </div>

                  <div>
                    <div className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                      {node.title}
                      {status === 'needs_remediation' && (
                        <span className="text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full">
                          Remediation Required
                        </span>
                      )}
                      {status === 'mastered' && (
                        <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                          Mastered (Bypassed)
                        </span>
                      )}
                      {status === 'active' && (
                        <span className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                          Start Briefing ➔
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{node.desc}</div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono font-bold text-slate-200">
                    {(node.score * 100).toFixed(0)}%
                  </div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Mastery</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeLesson && currentLessonData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Micro-Lesson Briefing
                </span>
                <h3 className="font-bold text-white text-base mt-1">
                  {currentLessonData.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Native Unblockable HTML5 Player */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner flex items-center justify-center">
              <video
                key={activeLesson}
                src={currentLessonData.videoFileUrl}
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              💡 <strong>Key Protocol:</strong> {currentLessonData.summary}
            </p>

            {/* Coursera Link */}
            {currentLessonData.courseraUrl && (
              <div className="bg-indigo-950/30 border border-indigo-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 block">Recommended Certification:</span>
                  <span className="text-slate-200">{currentLessonData.courseraTitle || 'Coursera Remediation Course'}</span>
                </div>
                <a
                  href={currentLessonData.courseraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 rounded-lg flex items-center gap-1 font-semibold transition"
                >
                  Coursera <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Validation Action */}
            <button
              onClick={() => {
                onSimulatePass(activeLesson);
                setActiveLesson(null);
              }}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white rounded-xl transition cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              Complete Lesson & Validate Mastery (90%)
            </button>
          </div>
        </div>
      )}

      {/* Screen Navigation */}
      {onNavigate && (
        <div className="pt-6 mt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            <span>View Manager ROI Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}