export const roadmapNodes = [
  { id: 1, title: 'Phishing Awareness', status: 'mastered', score: 72, category: 'Email Defense' },
  { id: 2, title: 'Password Hygiene', status: 'mastered', score: 85, category: 'Identity & Access' },
  { id: 3, title: 'Social Engineering', status: 'active', score: 45, category: 'Human Vulnerabilities' },
  { id: 4, title: 'Data Handling', status: 'locked', score: 60, category: 'Information Security' },
  { id: 5, title: 'Incident Reporting', status: 'locked', score: 35, category: 'Security Operations' },
];

export const radarData = [
  { subject: 'Phishing', teamScore: 72, benchmark: 85, fullMark: 100 },
  { subject: 'Passwords', teamScore: 85, benchmark: 90, fullMark: 100 },
  { subject: 'Social Eng.', teamScore: 45, benchmark: 80, fullMark: 100 },
  { subject: 'Data Handling', teamScore: 60, benchmark: 75, fullMark: 100 },
  { subject: 'Incident Rep.', teamScore: 35, benchmark: 80, fullMark: 100 },
];

export const PRESET_SCENARIOS = {
  diagnostic: {
    name: 'Scenario 1: Fresh Onboarding (Cold Start)',
    description: 'Simulates a new employee with baseline uncalibrated skills.',
    mastery: {
      "Phishing Awareness": 0.50,
      "Password Hygiene": 0.40,
      "Social Engineering": 0.30,
      "Confidential Data Handling": 0.35,
      "Incident Reporting & SLA": 0.25,
    }
  },
  midLevel: {
    name: 'Scenario 2: Developer with Social Eng. Gap',
    description: 'Strong technical skills but flagged for physical and voice pretexting vulnerability.',
    mastery: {
      "Phishing Awareness": 0.72,
      "Password Hygiene": 0.85,
      "Social Engineering": 0.45,
      "Confidential Data Handling": 0.60,
      "Incident Reporting & SLA": 0.35,
    }
  },
  mastered: {
    name: 'Scenario 3: Post-Remediation Security Champion',
    description: 'All 5 domains verified above enterprise compliance threshold (>85%).',
    mastery: {
      "Phishing Awareness": 0.94,
      "Password Hygiene": 0.96,
      "Social Engineering": 0.89,
      "Confidential Data Handling": 0.91,
      "Incident Reporting & SLA": 0.93,
    }
  }
};
