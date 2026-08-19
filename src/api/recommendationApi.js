import { API_BASE_URL, USE_MOCK_API, SUBDOMAINS } from './config';

export async function fetchRecommendations(userId, options = { dry_run: false }) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          recommended_courses: [
            {
              course_id: "c1",
              title: "Advanced Phishing Defense",
              subdomain: SUBDOMAINS.PHISHING,
              difficulty: 3,
              est_duration_min: 15,
              description: "Learn to identify sophisticated spear-phishing attacks."
            },
            {
              course_id: "c2",
              title: "Data Handling Basics",
              subdomain: SUBDOMAINS.DATA_HANDLING,
              difficulty: 1,
              est_duration_min: 10,
              description: "Fundamental rules for handling sensitive corporate data."
            }
          ]
        });
      }, 400);
    });
  }

  const response = await fetch(`${API_BASE_URL}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, dry_run: options.dry_run })
  });
  
  if (!response.ok) throw new Error('Failed to fetch recommendations');
  return await response.json();
}
