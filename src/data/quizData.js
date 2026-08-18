export const quizQuestions = [
  {
    id: "q1",
    subDomain: "Phishing Awareness",
    difficulty: "Medium",
    question: "An employee receives an urgent email from 'support@paypa1-security.com' claiming their account is locked and instructing them to click a verification link immediately. What indicators reveal this is a phishing attack?",
    options: [
      { id: "a", text: "Urgency tactic ('immediately') and a lookalike spoofed domain ('paypa1')", correct: true },
      { id: "b", text: "The email was received during business hours", correct: false },
      { id: "c", text: "The email came with an encrypted SSL certificate in the subject", correct: false },
      { id: "d", text: "The email asked the user to change password from official settings", correct: false }
    ],
    explanations: {
      simple: "Scammers use typo-squatted domains (like replacing 'l' with '1' in 'paypa1') and create fake urgency so you panic and click without verifying.",
      tech: "This attack demonstrates Typosquatting / IDN Homograph spoofing combined with psychological urgency heuristic. Attack vectors exploit SPF/DKIM validation mismatches and credential harvester landing pages."
    },
    bkt_metrics: {
      p_know: 0.72,
      p_transit: 0.15,
      p_slip: 0.10,
      p_guess: 0.20
    }
  },
  {
    id: "q2",
    subDomain: "Password Hygiene",
    difficulty: "Easy",
    question: "Which of the following authentication strategies provides the highest resistance against credential stuffing and brute-force dictionary attacks?",
    options: [
      { id: "a", text: "A 16+ character unique passphrase stored in a password manager with FIDO2/WebAuthn Hardware MFA", correct: true },
      { id: "b", text: "Changing an 8-character password every 30 days by incrementing a trailing number (e.g. Pass1 to Pass2)", correct: false },
      { id: "c", text: "Using the same complex 20-character password across personal and work applications", correct: false },
      { id: "d", text: "Relying purely on SMS-based 2FA with a simple 6-digit PIN", correct: false }
    ],
    explanations: {
      simple: "Long passphrases generated uniquely for every site, combined with hardware security keys (like YubiKey or biometric passkeys), make it nearly impossible for attackers to guess or steal your credentials.",
      tech: "FIDO2 / WebAuthn relies on public-key asymmetric cryptography with origin-bound domain binding, completely mitigating credential replay, SIM swapping, and adversary-in-the-middle (AiTM) phishing."
    },
    bkt_metrics: {
      p_know: 0.85,
      p_transit: 0.12,
      p_slip: 0.08,
      p_guess: 0.18
    }
  },
  {
    id: "q3",
    subDomain: "Social Engineering",
    difficulty: "Hard",
    question: "A stranger dressed in a courier uniform approaches a secure office doorway carrying heavy boxes and politely asks an employee to hold the badge-restricted door open. What is this tactic called?",
    options: [
      { id: "a", text: "Tailgating / Piggybacking (Physical Social Engineering)", correct: true },
      { id: "b", text: "Watering Hole Attack", correct: false },
      { id: "c", text: "Evil Twin Access Point Attack", correct: false },
      { id: "d", text: "DNS Cache Poisoning", correct: false }
    ],
    explanations: {
      simple: "Tailgating happens when an unauthorized person tricks an employee into letting them slip through a secured door by pretending to need help or being in a hurry.",
      tech: "Tailgating exploits human politeness and social compliance norms to bypass physical access controls (PACS / RFID badge barriers), facilitating unauthorized on-premise reconnaissance."
    },
    bkt_metrics: {
      p_know: 0.45,
      p_transit: 0.18,
      p_slip: 0.12,
      p_guess: 0.22
    }
  },
  {
    id: "q4",
    subDomain: "Confidential Data Handling",
    difficulty: "Medium",
    question: "You need to share a customer database spreadsheet containing PII (Personally Identifiable Information) with a third-party audit consultant. What is the safest compliant procedure?",
    options: [
      { id: "a", text: "Use company-approved encrypted cloud repository with RBAC, time-limited access tokens, and watermarking", correct: true },
      { id: "b", text: "Upload the raw CSV file to a public Google Drive link with 'Anyone with link can view'", correct: false },
      { id: "c", text: "Send the unencrypted spreadsheet as an attachment to their personal Gmail address", correct: false },
      { id: "d", text: "Paste the raw data into a public generative AI chat tool to format it first", correct: false }
    ],
    explanations: {
      simple: "Never email raw sensitive files or use public links. Always use authorized enterprise channels with strict expiration dates and encrypted sharing.",
      tech: "Adheres to GDPR/ISO 27001 data protection controls: AES-256 encryption at rest/in transit, Role-Based Access Control (RBAC), and Data Loss Prevention (DLP) audit logging."
    },
    bkt_metrics: {
      p_know: 0.60,
      p_transit: 0.14,
      p_slip: 0.09,
      p_guess: 0.20
    }
  },
  {
    id: "q5",
    subDomain: "Incident Reporting & SLA",
    difficulty: "Hard",
    question: "You accidentally entered your corporate domain credentials into a suspicious web portal 2 minutes ago. What is your immediate and correct first action?",
    options: [
      { id: "a", text: "Immediately report the security incident to the SOC/IT Security Helpdesk and reset credentials from a known clean device", correct: true },
      { id: "b", text: "Delete your browser history, restart your PC, and wait to see if any unusual emails appear", correct: false },
      { id: "c", text: "Keep quiet to avoid getting in trouble, hoping the attacker won't notice", correct: false },
      { id: "d", text: "Email all your colleagues asking them if their accounts were also hacked", correct: false }
    ],
    explanations: {
      simple: "Fast reporting saves the company! Alerting the IT Security Team immediately lets them revoke active tokens and prevent malware from spreading across the network.",
      tech: "Immediate incident triage enables the SOC to revoke Kerberos/OAuth tokens, isolate host telemetry via EDR, and review lateral movement logs within the golden 1-hour containment window."
    },
    bkt_metrics: {
      p_know: 0.35,
      p_transit: 0.20,
      p_slip: 0.10,
      p_guess: 0.25
    }
  },
  {
    id: "q6",
    subDomain: "Social Engineering",
    difficulty: "Medium",
    question: "An executive receives a phone call from someone claiming to be the Chief Information Officer demanding an immediate wire transfer for an urgent vendor contract. What type of attack is this?",
    options: [
      { id: "a", text: "Vishing (Voice Phishing) and Executive Impersonation / CEO Fraud", correct: true },
      { id: "b", text: "Distributed Denial of Service (DDoS)", correct: false },
      { id: "c", text: "Cross-Site Scripting (XSS)", correct: false },
      { id: "d", text: "Buffer Overflow Exploit", correct: false }
    ],
    explanations: {
      simple: "Vishing uses phone calls and high-pressure scenarios pretending to be senior executives to bypass normal verification processes.",
      tech: "Business Email Compromise (BEC) and Vishing utilize AI deepfake voice synthesis and urgency authority pretexting to bypass two-person authorization controls for financial transactions."
    },
    bkt_metrics: {
      p_know: 0.45,
      p_transit: 0.18,
      p_slip: 0.12,
      p_guess: 0.22
    }
  }
];

export const sampleQuiz = quizQuestions[0];