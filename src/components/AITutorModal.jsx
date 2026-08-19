import React, { useState } from 'react';
import { Bot, X, Sparkles, Send, User, Shield, HelpCircle, CheckCircle } from 'lucide-react';

export default function AITutorModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am the **AdaptIQ Explainable Knowledge Coach**. You can ask me anything about cybersecurity threats, best practices, or how our Bayesian Knowledge Tracing (BKT) engine calculates your mastery!",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Explain Pretexting vs Phishing in simple words",
    "How does BKT calculate lucky guesses and careless slips?",
    "What is the Golden Hour in incident response?",
    "Why does FIDO2 hardware MFA stop reverse proxy phishing?"
  ];

  const knowledgeBase = {
    "Explain Pretexting vs Phishing in simple words": {
      simple: "Phishing is casting a wide net with fake emails/links to trick people into clicking. Pretexting is crafting an elaborate fake scenario or persona (e.g. pretending to be an IT director or delivery courier) to manipulate you into giving up private access.",
      tech: "Phishing (CWE-1021 / CAPEC-98) uses automated lures over electronic channels. Pretexting (CAPEC-416) involves targeted social compliance framing, role assumption, and psychological manipulation to circumvent physical (PACS) or administrative authorization barriers."
    },
    "How does BKT calculate lucky guesses and careless slips?": {
      simple: "If you get a question right, AdaptIQ doesn't blindly assume you're an expert—it discounts for lucky guesses P(G). If you make a one-off mistake on a topic you usually master, it treats it as a careless slip P(S) rather than wiping out your whole progress.",
      tech: "BKT applies Bayes' theorem across two observation likelihoods: P(Correct | Mastered) = 1 - P(S), and P(Correct | Unmastered) = P(G). Posterior probability P(L_t|Obs) is mathematically bounded and updated iteratively per interaction."
    },
    "What is the Golden Hour in incident response?": {
      simple: "The Golden Hour is the first 60 minutes after a potential breach. If you report a clicked malicious link immediately, security can lock down the compromised session before hackers spread malware across the company.",
      tech: "Within the initial 60 minutes post-compromise, SOC teams must execute host network isolation via EDR, revoke active OAuth/Kerberos ticket-granting tokens, and correlate DNS sinkhole telemetry before lateral movement or ransomware staging occurs."
    },
    "Why does FIDO2 hardware MFA stop reverse proxy phishing?": {
      simple: "Traditional OTP codes can be intercepted by fake websites. FIDO2 security keys talk directly with your browser and the real website domain via cryptography, so a fake website cannot capture or reuse your login.",
      tech: "FIDO2 / WebAuthn utilizes public-key cryptography with cryptographically bound origin binding (ClientDataJSON hash verified against Relying Party ID). Reverse-proxy Evilginx AiTM proxies cannot forge the browser-origin challenge, neutralizing adversary-in-the-middle relays."
    }
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "Great question! In the AdaptIQ adaptive framework, continuous diagnostic testing combined with Bayesian Knowledge Tracing guarantees that learners are remediated exactly where knowledge gaps exist.";
      
      const foundKey = Object.keys(knowledgeBase).find(k => k.toLowerCase() === text.toLowerCase());
      if (foundKey) {
        aiResponseText = `💡 **Concept Breakdown:**\n\n${knowledgeBase[foundKey].simple}\n\n🛡️ **Technical Underpinning:**\n${knowledgeBase[foundKey].tech}`;
      } else {
        aiResponseText = `Here is the explanation regarding "${text}": In cybersecurity defense and adaptive learning, maintaining proactive verification and reducing dwell time through rapid containment are essential pillars. AdaptIQ automatically logs this focus area into your BKT mastery tracking.`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full h-[600px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                AdaptIQ Knowledge Coach
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Explainable AI
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Interactive Cybersecurity & BKT Learning Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                {msg.text}
                <span className="block text-[10px] opacity-60 mt-2 text-right">{msg.timestamp}</span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono italic">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              AdaptIQ Coach is analyzing...
            </div>
          )}
        </div>

        {/* Quick Suggestions Chips */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 whitespace-nowrap transition cursor-pointer"
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything (e.g. How does BKT model guess probability?)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
