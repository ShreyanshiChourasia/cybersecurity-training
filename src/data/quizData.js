export const quizQuestions = [
  // --- 1. Phishing & Email Spoofing Defense (2 Questions) ---
  {
    id: 1,
    topic: 'phishing',
    domain: 'Phishing Defense',
    question: 'You receive an urgent email from "IT-Support@corp-security-portal.com" requesting password verification within 15 minutes. What is the safest immediate action?',
    options: [
      'Report the email via the official PhishAlarm plugin and alert SOC directly.',
      'Click the link immediately to prevent account suspension.',
      'Forward the message to your team members asking if it looks legit.',
      'Reply directly asking the sender to prove their identity.'
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    topic: 'phishing',
    domain: 'Phishing Defense',
    question: 'An invoice email contains a password-protected ZIP file and requests enabling macros in Excel to view payment details. What should you do?',
    options: [
      'Enable macros only if your antivirus scan returns clean.',
      'Extract the file, verify macros are disabled, and forward to accounting.',
      'Treat the password-protected attachment as malicious and quarantine via security operations.',
      'Open the document inside an incognito browser window.'
    ],
    correctAnswer: 2
  },

  // --- 2. Zero-Trust Access & Hardware MFA (2 Questions) ---
  {
    id: 3,
    topic: 'passwords',
    domain: 'Zero-Trust Access & MFA',
    question: 'An employee receives five consecutive push notifications on their mobile authenticator app at 2:00 AM without attempting a login. What attack is happening?',
    options: [
      'Session token replay attacks.',
      'MFA Fatigue / Push bombing to coerce approval.',
      'DNS Cache Poisoning on the mobile gateway.',
      'Public key certificate expiration.'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    topic: 'passwords',
    domain: 'Zero-Trust Access & MFA',
    question: 'Which authentication mechanism provides the highest resistance against Adversary-in-the-Middle (AiTM) proxy attacks?',
    options: [
      'SMS-delivered 6-digit one-time passcodes (OTP).',
      'Hardware-backed FIDO2 / WebAuthn security keys.',
      'Rotating alphanumeric passwords every 30 days.',
      'Email verification confirmation magic links.'
    ],
    correctAnswer: 1
  },

  // --- 3. Behavioral Social Defense & Pretexting (2 Questions) ---
  {
    id: 5,
    topic: 'social_engineering',
    domain: 'Behavioral Social Defense',
    question: 'A caller claiming to be the CTO demands an emergency vendor wire transfer bypass because they are in an offsite executive board meeting. How do you respond?',
    options: [
      'Process the wire immediately to avoid executive reprimand.',
      'Perform out-of-band verification using pre-established internal directory numbers.',
      'Ask the caller for their badge number and proceed if provided.',
      'Transfer the funds to a temporary holding account pending later review.'
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    topic: 'social_engineering',
    domain: 'Behavioral Social Defense',
    question: 'A technician wearing vendor overalls holding heavy coffee cups asks you to hold the secured access door open behind you. What is this security risk?',
    options: [
      'Tailgating / Piggybacking physical access breach.',
      'Credential stuffing on badge reader systems.',
      'Buffer overflow on NFC door controllers.',
      'Physical token sniffing.'
    ],
    correctAnswer: 0
  },

  // --- 4. Classified Data Handling & Tokenization (2 Questions) ---
  {
    id: 7,
    topic: 'data_handling',
    domain: 'Classified Data Handling',
    question: 'You want to debug proprietary codebase errors using an external generative AI chatbot. What is the compliant protocol?',
    options: [
      'Paste the whole codebase as long as comments are stripped.',
      'Sanitize all proprietary logic, API keys, and corporate identifiers or use enterprise-isolated instances.',
      'Sign in with a personal Gmail account to decouple company liability.',
      'Use any chatbot provided the chat history retention switch is toggled off.'
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    topic: 'data_handling',
    domain: 'Classified Data Handling',
    question: 'Which method should be used when transmitting high-risk Personally Identifiable Information (PII) datasets to a verified external auditor?',
    options: [
      'Send as an attachment via standard unencrypted email.',
      'Upload to a personal Google Drive and share a public view-only link.',
      'Apply tokenization / AES-256 field encryption and transmit via an authenticated SFTP / TLS portal.',
      'Compress inside a standard zip archive with a simple 4-digit PIN.'
    ],
    correctAnswer: 2
  },

  // --- 5. Critical Incident Escalation & SOC Forensics (2 Questions) ---
  {
    id: 9,
    topic: 'incident_reporting',
    domain: 'Critical Incident Escalation',
    question: 'Your workstation screen flashes an active ransomware lock warning. What is the immediate first action to take?',
    options: [
      'Power down the PC completely using the main power strip.',
      'Disconnect Ethernet and disable Wi-Fi while leaving the machine powered on.',
      'Attempt to run third-party anti-malware tools from a personal USB drive.',
      'Contact the ransomware contact email to negotiate decryptor pricing.'
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    topic: 'incident_reporting',
    domain: 'Critical Incident Escalation',
    question: 'When should a suspected unauthorized account access event be escalated to the Security Operations Center (SOC)?',
    options: [
      'Only after you have personally verified that data was stolen.',
      'At the end of the work week during standard IT ticket grooming.',
      'Immediately upon observation, following the documented Incident Response triage ladder.',
      'Only if the incident impacts more than 10 employee accounts.'
    ],
    correctAnswer: 2
  }
];