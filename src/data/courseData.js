export const RECOMMENDED_COURSES = {
  "Phishing Awareness": [
    {
      id: "phish-101",
      title: "Spotting Email Anomalies, Typosquatting & Spoofed Headers",
      platform: "CyberSec Defense Hub",
      duration: "12 mins",
      difficulty: "Beginner",
      description: "Learn to deconstruct email headers, inspect hidden hyperlinks, and detect homoglyph domains.",
      skills: ["Header Analysis", "Hyperlink Inspection", "Typosquatting Detection"],
      link: "#phishing-course-1"
    },
    {
      id: "phish-102",
      title: "Recognizing Urgency Tactics, AiTM Phishing & QR Code Attacks (Quishing)",
      platform: "Interactive Threat Simulation Lab",
      duration: "18 mins",
      difficulty: "Intermediate",
      description: "Hands-on walkthrough dissecting modern reverse-proxy adversary-in-the-middle attacks.",
      skills: ["Quishing Awareness", "Reverse Proxy Phishing", "MFA Bypass Defense"],
      link: "#phishing-course-2"
    }
  ],
  "Password Hygiene": [
    {
      id: "pass-101",
      title: "Enterprise Password Policy, Passkeys & FIDO2 Hardware Keys",
      platform: "Identity Security Academy",
      duration: "15 mins",
      difficulty: "Beginner",
      description: "Master password entropy, password managers, and modern passwordless FIDO2 protocols.",
      skills: ["Passkey Setup", "FIDO2 / WebAuthn", "Password Entropy"],
      link: "#password-course-1"
    },
    {
      id: "pass-102",
      title: "Mitigating Credential Stuffing & Hash-Cracking Dictionary Attacks",
      platform: "CyberSec Defense Hub",
      duration: "10 mins",
      difficulty: "Intermediate",
      description: "Understand dark web credential dumps, hash salting, and automated breach alerting.",
      skills: ["Breach Audits", "Credential Reuse Risks", "Multi-Account Isolation"],
      link: "#password-course-2"
    }
  ],
  "Social Engineering": [
    {
      id: "soceng-101",
      title: "Pretexting, AI Voice Clones & Vishing Defense Playbook",
      platform: "Human Factor Security Lab",
      duration: "20 mins",
      difficulty: "Intermediate",
      description: "Defend against AI voice spoofing, pretexting phone calls, and executive impersonation scams.",
      skills: ["Voice Phishing (Vishing)", "Executive Pretexting", "Out-of-Band Verification"],
      link: "#social-course-1"
    },
    {
      id: "soceng-102",
      title: "Physical Access Control & Tailgating Prevention at Secured Facilities",
      platform: "Enterprise Physical Security",
      duration: "14 mins",
      difficulty: "Beginner",
      description: "Best practices for maintaining perimeter security, badge validation, and visitor challenge protocols.",
      skills: ["Badge Challenge Protocol", "Physical Perimeter Defense", "Visitor Escort SLA"],
      link: "#social-course-2"
    }
  ],
  "Confidential Data Handling": [
    {
      id: "data-101",
      title: "PII Classification, DLP Policies & Cryptographic Storage",
      platform: "Data Governance Institute",
      duration: "18 mins",
      difficulty: "Intermediate",
      description: "Understand GDPR, ISO 27001 data tiers, role-based access control, and AES-256 file encryption.",
      skills: ["PII Classification", "RBAC Enforcement", "Encrypted Transit"],
      link: "#data-course-1"
    },
    {
      id: "data-102",
      title: "Safe Generative AI Usage & Preventing Corporate Data Leaks",
      platform: "Enterprise AI Security Hub",
      duration: "15 mins",
      difficulty: "Beginner",
      description: "Guidelines on preventing proprietary code and customer data from being leaked into public LLMs.",
      skills: ["AI Data Sanitization", "Prompt Data Redaction", "API Security"],
      link: "#data-course-2"
    }
  ],
  "Incident Reporting & SLA": [
    {
      id: "inc-101",
      title: "Golden Hour Incident Containment: First Responder Checklist",
      platform: "SOC Incident Command",
      duration: "12 mins",
      difficulty: "Intermediate",
      description: "Step-by-step triage when you click a malicious payload: immediate isolation and ticket filing.",
      skills: ["Host Isolation", "Token Revocation", "SOC Escalation"],
      link: "#incident-course-1"
    },
    {
      id: "inc-102",
      title: "Breach Notification Protocols & Regulatory Compliance Timelines",
      platform: "Cyber Regulatory Academy",
      duration: "16 mins",
      difficulty: "Advanced",
      description: "Understand CERT-In / GDPR 72-hour reporting mandates and legal incident documentation.",
      skills: ["CERT-In Compliance", "Audit Trail Preservation", "Root-Cause Reporting"],
      link: "#incident-course-2"
    }
  ]
};
