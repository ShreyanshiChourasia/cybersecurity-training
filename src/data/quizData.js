export const sampleQuiz = {
  id: "q1",
  question: "An employee receives an email asking them to urgently reset their corporate password via an external link. What type of attack is this?",
  options: [
    { id: "a", text: "Phishing Attack", correct: true },
    { id: "b", text: "SQL Injection", correct: false },
    { id: "c", text: "Man-in-the-Middle", correct: false },
    { id: "d", text: "DDoS Attack", correct: false }
  ],
  explanations: {
    tech: "Phishing involves social engineering where attackers impersonate trusted entities via email/links to steal credentials.",
    simple: "It's a fake email designed to trick you into revealing sensitive information like your password."
  },
  bkt_metrics: {
    p_know: 0.72,
    p_transit: 0.15,
    p_slip: 0.10,
    p_guess: 0.20
  }
};