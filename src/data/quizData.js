export const quizQuestions = [
  {
    id: 1,
    topic: "phishing",
    question: "You receive an urgent email from 'support@paypa1-security.com' claiming your account is locked. What is the immediate correct action?",
    options: [
      "Click the verification link immediately to unlock it",
      "Inspect the sender SMTP domain and report as phishing to SOC",
      "Reply asking for proof of identity",
      "Forward the email to all colleagues"
    ],
    correctAnswer: 1,
    simpleExplanation: "Fake letters or numbers in the domain name (like 'paypa1' instead of 'paypal') indicate a spoofing attempt. Never click urgent links.",
    technicalExplanation: "Adversaries register typosquatted domains lacking valid SPF/DKIM records. Inspecting raw MIME headers reveals deceptive SMTP envelope-from headers."
  },
  {
    id: 2,
    topic: "phishing",
    question: "An email contains an attached invoice named 'Invoice_Aug2026.pdf.exe'. What indicates this is malicious?",
    options: [
      "The file size is too small",
      "It has a double extension hiding an executable payload",
      "PDFs cannot be sent via email",
      "It is addressed to the billing team"
    ],
    correctAnswer: 1,
    simpleExplanation: "Attackers add fake extensions like .pdf in front of .exe so Windows hides the dangerous executable program.",
    technicalExplanation: "Adversaries exploit default OS extension-hiding behaviors (Hide File Extensions for Known Types) to mask PE32 binary execution under user-familiar document extensions."
  },
  {
    id: 3,
    topic: "passwords",
    question: "Which authentication method offers the strongest defense against real-time Adversary-in-the-Middle (AiTM) phishing proxies?",
    options: [
      "SMS-based 6-digit one-time code",
      "Hardware-backed FIDO2 / WebAuthn security key",
      "16-character alphanumeric password changed monthly",
      "Email magic link verification"
    ],
    correctAnswer: 1,
    simpleExplanation: "Hardware keys can't be tricked by fake login pages because they talk directly to the real website via secure cryptographic handshakes.",
    technicalExplanation: "FIDO2/WebAuthn binds authentication cryptographically to the browser's origin TLS domain, rendering stolen session cookies and reverse-proxy interception useless."
  },
  {
    id: 4,
    topic: "passwords",
    question: "Why should corporate master passwords never be reused across personal third-party web accounts?",
    options: [
      "Third-party sites notify employers of password usage",
      "Credential stuffing attacks use breached external databases against enterprise portals",
      "Passwords automatically expire after single-site usage",
      "Browser autofill stops working on duplicate passwords"
    ],
    correctAnswer: 1,
    simpleExplanation: "When a random website gets hacked, attackers test that exact email and password combo across corporate logins.",
    technicalExplanation: "Automated credential stuffing botnets parse plaintext combolists from third-party database breaches and execute targeted brute-force replay against Okta/Azure AD enterprise IDPs."
  },
  {
    id: 5,
    topic: "social_engineering",
    question: "A caller claiming to be the IT Director demands your MFA code immediately to stop an ongoing breach. What do you do?",
    options: [
      "Read out the code quickly to prevent downtime",
      "Refuse and verify identity via official out-of-band corporate channels",
      "Send the code via personal WhatsApp",
      "Change your password and give the new password instead"
    ],
    correctAnswer: 1,
    simpleExplanation: "Legitimate IT staff will never ask for your one-time code over the phone. Always hang up and call them back on official Slack/directory numbers.",
    technicalExplanation: "Pretexting attacks rely on simulated authority and manufactured crisis timelines to induce cognitive overload and bypass zero-trust verification procedures."
  },
  {
    id: 6,
    topic: "social_engineering",
    question: "A delivery worker without a visible security badge holds heavy boxes and asks you to hold the secured entry door open. What is the protocol?",
    options: [
      "Hold the door to be polite",
      "Direct them to the reception desk to sign in and badge through",
      "Ask them what company they work for and let them in",
      "Take the package and leave them unattended in the hallway"
    ],
    correctAnswer: 1,
    simpleExplanation: "Holding secure doors for unbadged visitors (tailgating) bypasses all physical security check-ins.",
    technicalExplanation: "Tailgating/piggybacking exploits social compliance norms to compromise physical perimeter boundaries without leaving an audit trail in the electronic access control system (EACS)."
  },
  {
    id: 7,
    topic: "data_handling",
    question: "You want to debug a proprietary customer payment script using a free public generative AI tool. What is the rule?",
    options: [
      "Paste the script as long as customer names are removed",
      "Never paste proprietary code or customer PII into public non-enterprise AI models",
      "Only use AI during non-business hours",
      "Paste the script if you delete your chat history afterward"
    ],
    correctAnswer: 1,
    simpleExplanation: "Public AI tools store your inputs to train their models, which can expose private company code and customer records to the public.",
    technicalExplanation: "Public LLM ingest pipelines retain submitted telemetry and prompt data for model fine-tuning, resulting in critical compliance violations under GDPR, HIPAA, and PCI-DSS."
  },
  {
    id: 8,
    topic: "data_handling",
    question: "When sending an encrypted spreadsheet of internal employee salaries, how should the decryption password be shared?",
    options: [
      "In the same email thread as the attachment",
      "Via a separate, out-of-band communication channel (e.g., encrypted corporate chat or phone call)",
      "In the email subject line",
      "Written on a sticky note attached to the recipient's monitor"
    ],
    correctAnswer: 1,
    simpleExplanation: "Sending the password in the same email means if someone intercepts the email, they get both the locked file and the key.",
    technicalExplanation: "In-band key transmission compromises the cryptographic envelope. Dual-channel key distribution guarantees that single-point transport compromises do not leak ciphertext and decrypt keys simultaneously."
  },
  {
    id: 9,
    topic: "incident_reporting",
    question: "Your laptop suddenly displays a ransomware pop-up warning that files are being encrypted. What is your FIRST immediate step?",
    options: [
      "Restart the computer repeatedly",
      "Disconnect Wi-Fi and unplug the Ethernet cable immediately",
      "Pay the ransom using personal cryptocurrency",
      "Send an email blast to all company staff"
    ],
    correctAnswer: 1,
    simpleExplanation: "Unplugging the network immediately stops the virus from spreading to the rest of the company while keeping computer memory intact for IT.",
    technicalExplanation: "Severing Layer 2/3 network interfaces isolates command-and-control (C2) lateral propagation and SMB traversal while preserving volatile kernel RAM for forensic extraction."
  },
  {
    id: 10,
    topic: "incident_reporting",
    question: "You accidentally clicked a suspicious link in an email and entered your login credentials 5 minutes ago. What should you do?",
    options: [
      "Close the browser tab and wait to see if anything strange happens",
      "Immediately report to the SOC / Security Team and trigger a password reset",
      "Delete the email and clear your browser cache only",
      "Turn off your computer and leave for the day"
    ],
    correctAnswer: 1,
    simpleExplanation: "Reporting immediately gives the security team time to kill any active attacker sessions before damage is done.",
    technicalExplanation: "Immediate notification enables SOC teams to revoke active session tokens, invalidate OAuth grants, and trace real-time API logs before privilege escalation occurs."
  }
];