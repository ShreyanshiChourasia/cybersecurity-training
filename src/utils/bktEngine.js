/**
 * AdaptIQ - Bayesian Knowledge Tracing (BKT) Engine
 * Problem Statement ID: SIH1409 (Smart India Hackathon 2026)
 * 
 * Standard BKT Parameters:
 * - P(L_0): Prior probability of initial knowledge
 * - P(T): Transition probability (learning rate per practice opportunity)
 * - P(S): Slip probability (knowing the skill but making a mistake)
 * - P(G): Guess probability (not knowing the skill but guessing correctly)
 */

export const DEFAULT_DOMAINS = {
  "Phishing Awareness": {
    id: "phishing",
    name: "Phishing Awareness",
    p_know: 0.72,
    p_transit: 0.15,
    p_slip: 0.10,
    p_guess: 0.20,
    history: []
  },
  "Password Hygiene": {
    id: "passwords",
    name: "Password Hygiene",
    p_know: 0.85,
    p_transit: 0.12,
    p_slip: 0.08,
    p_guess: 0.18,
    history: []
  },
  "Social Engineering": {
    id: "social_eng",
    name: "Social Engineering",
    p_know: 0.45,
    p_transit: 0.18,
    p_slip: 0.12,
    p_guess: 0.22,
    history: []
  },
  "Confidential Data Handling": {
    id: "data_handling",
    name: "Confidential Data Handling",
    p_know: 0.60,
    p_transit: 0.14,
    p_slip: 0.09,
    p_guess: 0.20,
    history: []
  },
  "Incident Reporting & SLA": {
    id: "incident_rep",
    name: "Incident Reporting & SLA",
    p_know: 0.35,
    p_transit: 0.20,
    p_slip: 0.10,
    p_guess: 0.25,
    history: []
  }
};

/**
 * Computes Posterior Knowledge P(L_t | Observation) and updates next prior P(L_{t+1})
 * 
 * @param {number} prior - Current mastery estimate P(L_{t-1})
 * @param {boolean} isCorrect - Learner response correctness (true/false)
 * @param {number} pSlip - Probability of slip P(S)
 * @param {number} pGuess - Probability of guess P(G)
 * @param {number} pTransit - Probability of transition P(T)
 * @param {number} confidence - Learner confidence rating (0-100)
 * @returns {object} calculation breakdown and updated mastery
 */
export function updateBKT(prior, isCorrect, pSlip = 0.10, pGuess = 0.20, pTransit = 0.15, confidence = 50) {
  // Confidence scaling factor: high confidence correct answers boost mastery faster;
  // high confidence incorrect answers penalize misconceptions more heavily.
  const confFactor = (confidence - 50) / 100; // range: -0.5 to +0.5
  const effectiveSlip = Math.max(0.02, Math.min(0.35, pSlip - (isCorrect ? confFactor * 0.05 : 0)));
  const effectiveGuess = Math.max(0.05, Math.min(0.40, pGuess + (!isCorrect ? confFactor * 0.05 : 0)));

  let pPosterior;

  if (isCorrect) {
    // Bayes Rule for correct observation:
    // P(L_t | Correct) = (P(L_{t-1}) * (1 - P(S))) / (P(L_{t-1}) * (1 - P(S)) + (1 - P(L_{t-1})) * P(G))
    const numerator = prior * (1 - effectiveSlip);
    const denominator = numerator + (1 - prior) * effectiveGuess;
    pPosterior = denominator > 0 ? numerator / denominator : prior;
  } else {
    // Bayes Rule for incorrect observation:
    // P(L_t | Incorrect) = (P(L_{t-1}) * P(S)) / (P(L_{t-1}) * P(S) + (1 - P(L_{t-1})) * (1 - P(G)))
    const numerator = prior * effectiveSlip;
    const denominator = numerator + (1 - prior) * (1 - effectiveGuess);
    pPosterior = denominator > 0 ? numerator / denominator : prior;
  }

  // Knowledge transition step:
  // P(L_{t+1}) = P(L_t | Obs) + (1 - P(L_t | Obs)) * P(T)
  const pUpdated = pPosterior + (1 - pPosterior) * pTransit;

  // Clamping probability in [0.01, 0.99]
  const finalMastery = Math.min(0.99, Math.max(0.01, pUpdated));

  return {
    prior: Number(prior.toFixed(4)),
    isCorrect,
    confidence,
    effectiveSlip: Number(effectiveSlip.toFixed(4)),
    effectiveGuess: Number(effectiveGuess.toFixed(4)),
    pPosterior: Number(pPosterior.toFixed(4)),
    pTransit: Number(pTransit.toFixed(4)),
    updatedMastery: Number(finalMastery.toFixed(4)),
    scorePercent: Math.round(finalMastery * 100),
    delta: Number((finalMastery - prior).toFixed(4))
  };
}

/**
 * Returns the recommended sub-domain that has lowest mastery (needs remediation most)
 */
export function getWeakestDomain(domainState) {
  let weakest = null;
  let lowestScore = Infinity;

  Object.entries(domainState).forEach(([name, data]) => {
    if (data.p_know < lowestScore) {
      lowestScore = data.p_know;
      weakest = name;
    }
  });

  return { domainName: weakest, mastery: lowestScore };
}
