import { API_BASE_URL, USE_MOCK_API } from './config';

export async function simulateWhatIf(userId, simulationData) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a simulated response without saving
        resolve({
          dry_run: true,
          simulated_mastery_change: {
             [simulationData.subdomain]: simulationData.is_correct ? 0.05 : -0.05
          }
        });
      }, 300);
    });
  }

  const response = await fetch(`${API_BASE_URL}/assess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      attempts: [simulationData],
      dry_run: true
    })
  });
  
  if (!response.ok) throw new Error('Failed to simulate');
  return await response.json();
}
