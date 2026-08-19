import { API_BASE_URL, USE_MOCK_API, initialMockMastery, SUBDOMAINS } from './config';

// Store state locally in mock mode
let currentMockMastery = { ...initialMockMastery };

export async function submitAssessment(userId, attempt) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock feedback based on the answer
        const isCorrect = attempt.selected_option === 'c' || attempt.selected_option === 'b';
        
        // Slightly adjust mastery for simulation
        if (isCorrect) {
           currentMockMastery.mastery[attempt.subdomain] = Math.min(1.0, currentMockMastery.mastery[attempt.subdomain] + 0.05);
        } else {
           currentMockMastery.mastery[attempt.subdomain] = Math.max(0.0, currentMockMastery.mastery[attempt.subdomain] - 0.02);
        }

        resolve({
          is_correct: isCorrect,
          updated_mastery: { ...currentMockMastery },
          explanation_tech: isCorrect 
            ? "Correct. Standard protocol dictates reporting suspicious links rather than interacting with them. This mitigates the risk of executing malicious payloads." 
            : "Incorrect. The payload could be executed merely by clicking. The optimal strategy is reporting to SecOps.",
          explanation_simple: isCorrect
            ? "Great job! It's like seeing a suspicious package—you don't open it, you call security."
            : "Oops! Think of it like a stranger asking for your house keys. You shouldn't trust them just because they say they're a locksmith.",
          distractor_feedback: isCorrect ? null : "Clicking the link exposes the organization to credential harvesting."
        });
      }, 600);
    });
  }

  const response = await fetch(`${API_BASE_URL}/assess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      attempts: [attempt]
    })
  });
  
  if (!response.ok) throw new Error('Failed to submit assessment');
  return await response.json();
}

export async function getMasteryState(userId) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...currentMockMastery }), 300);
    });
  }
  
  const response = await fetch(`${API_BASE_URL}/mastery?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch mastery');
  return await response.json();
}
