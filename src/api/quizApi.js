import { API_BASE_URL, USE_MOCK_API, SUBDOMAINS } from './config';

const mockQuestions = [
  {
    question_id: "q1",
    subdomain: SUBDOMAINS.PHISHING,
    difficulty: 2,
    text: "You receive an email from 'IT Helpdesk' asking you to click a link to verify your password immediately to avoid account suspension. What should you do?",
    options: [
      { id: "a", text: "Click the link and verify to be safe." },
      { id: "b", text: "Forward the email to a colleague to ask if it's real." },
      { id: "c", text: "Do not click. Report it to the IT security team." },
      { id: "d", text: "Reply to the email asking for proof of identity." }
    ]
  },
  {
    question_id: "q2",
    subdomain: SUBDOMAINS.PASSWORD_HYGIENE,
    difficulty: 3,
    text: "Which of the following is considered the strongest password practice?",
    options: [
      { id: "a", text: "Using a mix of upper and lower case letters with numbers, changed monthly." },
      { id: "b", text: "Using a long passphrase of random words with a password manager." },
      { id: "c", text: "Using your pet's name followed by the current year." },
      { id: "d", text: "Writing down a complex password and keeping it under your keyboard." }
    ]
  }
];

export async function fetchNextQuiz(userId) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a random question from mock
        const q = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
        resolve(q);
      }, 500);
    });
  }
  
  const response = await fetch(`${API_BASE_URL}/next-quiz?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch next quiz');
  return await response.json();
}
