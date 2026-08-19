import { useState } from 'react';
import { X, Bot, Send, User } from 'lucide-react';
import { Button } from './common/Button';

export default function AITutorModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Knowledge Coach. I can help explain any cybersecurity concepts you are struggling with. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', content: "That's a great question. In a real environment, I would connect to the LLM backend to explain this concept using the 'Simple Analogy' or 'Technical Solution' framework." }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center text-slate-800 font-bold">
            <Bot className="w-5 h-5 mr-2 text-indigo-600" />
            AI Knowledge Coach
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
            <Button onClick={handleSend} className="px-4"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </>
  );
}
