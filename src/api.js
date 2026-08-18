import { quizQuestions as mockQuiz } from './data/quizData';
import { roadmapNodes as mockRoadmap, radarData as mockRadar } from './mockData';
import { RECOMMENDED_COURSES as mockCourses } from './data/courseData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Complete 5-scope lesson & recommendation fallback data
export const FALLBACK_MODULE_LESSONS = {
  phishing: {
    title: 'Phishing & Email Spoofing Defense',
    videoFileUrl: '/lesson.mp4',
    courseraUrl: 'https://www.coursera.org/learn/foundations-of-cybersecurity',
    courseraTitle: 'Google Cybersecurity: Foundations & Phishing Defense',
    summary: 'Inspect sender SMTP headers, verify top-level domains against lookalike spoofing, and isolate suspicious attachments before executing.'
  },
  passwords: {
    title: 'Zero-Trust Access & Hardware MFA',
    videoFileUrl: '/lesson.mp4',
    courseraUrl: 'https://www.coursera.org/learn/cyber-security-roles-processes-operating-system-security',
    courseraTitle: 'IBM: Access Control & Zero-Trust Authentication',
    summary: 'Enforce hardware-backed FIDO2/WebAuthn tokens over SMS OTPs to neutralize adversary-in-the-middle credential proxies.'
  },
  social_engineering: {
    title: 'Behavioral Social Defense & Pretexting',
    videoFileUrl: '/lesson.mp4',
    courseraUrl: 'https://www.coursera.org/learn/social-engineering-security',
    courseraTitle: 'Infosec: Social Engineering & Pretexting Countermeasures',
    summary: 'Execute out-of-band verification through established corporate channels whenever emergency financial wire transfers are requested.'
  },
  data_handling: {
    title: 'Classified Data Handling & Tokenization',
    videoFileUrl: '/lesson.mp4',
    courseraUrl: 'https://www.coursera.org/learn/data-security-privacy',
    courseraTitle: 'Vanderbilt: Data Privacy, Tokenization & Compliance',
    summary: 'Mask sensitive PII and credit records prior to transit. Never paste confidential corporate datasets into unapproved public AI tools.'
  },
  incident_reporting: {
    title: 'Critical Incident Escalation & SOC Forensics',
    videoFileUrl: '/lesson.mp4',
    courseraUrl: 'https://www.coursera.org/learn/incident-response',
    courseraTitle: 'Google Cybersecurity: Incident Response & Escalation',
    summary: 'Immediately disconnect network adapters to sever command-and-control communication while preserving volatile system RAM for forensics.'
  }
};

/**
 * Universal safe fetcher:
 * 1. Pings the live backend endpoint.
 * 2. If the server is up and returns JSON, it serves the real live data.
 * 3. If the server is down or throws an error, it silently falls back to offline data.
 */
async function fetchWithFallback(endpoint, fallbackData) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const liveData = await response.json();
    console.info(`[Auto-Switch] Connected to live backend at ${endpoint}`);
    return { data: liveData, isLive: true };
  } catch (err) {
    console.warn(`[Auto-Switch] Backend unreachable at ${endpoint}. Using offline dataset.`, err.message);
    return { data: fallbackData, isLive: false };
  }
}

// Fetch diagnostic quiz bank
export async function getQuizQuestions() {
  return fetchWithFallback('/quiz', mockQuiz);
}

// Fetch user roadmap state
export async function getRoadmapData(userId = 'emp_hr') {
  return fetchWithFallback(`/roadmap?userId=${userId}`, mockRoadmap);
}

// Fetch manager radar / ROI metrics
export async function getDashboardData(userId = 'emp_hr') {
  return fetchWithFallback(`/dashboard?userId=${userId}`, mockRadar);
}

// Fetch module remediation lessons & recommendations
export async function getModuleLessons() {
  return fetchWithFallback('/lessons', FALLBACK_MODULE_LESSONS);
}

// Fetch certified course catalog / weak area recommendations
export async function getCourseRecommendations(topic = null) {
  const endpoint = topic ? `/courses?topic=${topic}` : '/courses';
  const fallback = topic ? (mockCourses[topic] || []) : mockCourses;
  return fetchWithFallback(endpoint, fallback);
}