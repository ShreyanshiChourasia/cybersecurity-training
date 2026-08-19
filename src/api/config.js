export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

// Common subdomains for typing
export const SUBDOMAINS = {
  PHISHING: 'phishing',
  PASSWORD_HYGIENE: 'password_hygiene',
  SOCIAL_ENGINEERING: 'social_engineering',
  DATA_HANDLING: 'data_handling',
  INCIDENT_REPORTING: 'incident_reporting'
};

// Initial mock mastery state
export const initialMockMastery = {
  user_id: "mock_user_1",
  mastery: {
    [SUBDOMAINS.PHISHING]: 0.32,
    [SUBDOMAINS.PASSWORD_HYGIENE]: 0.81,
    [SUBDOMAINS.SOCIAL_ENGINEERING]: 0.55,
    [SUBDOMAINS.DATA_HANDLING]: 0.40,
    [SUBDOMAINS.INCIDENT_REPORTING]: 0.10
  }
};
