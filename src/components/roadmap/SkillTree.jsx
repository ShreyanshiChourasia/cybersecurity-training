import { SkillNode } from './SkillNode';
import { SUBDOMAINS } from '../../api/config';

// Order defined in prompt
const ROADMAP_ORDER = [
  SUBDOMAINS.PHISHING,
  SUBDOMAINS.PASSWORD_HYGIENE,
  SUBDOMAINS.SOCIAL_ENGINEERING,
  SUBDOMAINS.DATA_HANDLING,
  SUBDOMAINS.INCIDENT_REPORTING
];

const MASTERY_THRESHOLD = 0.8;

export function SkillTree({ masteryData }) {
  if (!masteryData || !masteryData.mastery) return null;

  const determineStatus = (subdomain, index) => {
    const score = masteryData.mastery[subdomain] || 0;
    
    if (score >= MASTERY_THRESHOLD) return 'mastered';
    
    // If the previous one is mastered or it's the first one, it's active
    if (index === 0) return 'active';
    const prevSubdomain = ROADMAP_ORDER[index - 1];
    const prevScore = masteryData.mastery[prevSubdomain] || 0;
    
    if (prevScore >= MASTERY_THRESHOLD) return 'active';
    
    return 'locked';
  };

  return (
    <div className="py-8">
      {ROADMAP_ORDER.map((subdomain, idx) => (
        <SkillNode 
          key={subdomain}
          title={subdomain.replace('_', ' ').toUpperCase()}
          status={determineStatus(subdomain, idx)}
          isLast={idx === ROADMAP_ORDER.length - 1}
        />
      ))}
    </div>
  );
}
