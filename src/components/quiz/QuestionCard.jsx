import { Shield } from 'lucide-react';
import { ConfidenceSlider } from './ConfidenceSlider';

export function QuestionCard({ 
  question, 
  selectedOption, 
  onOptionSelect, 
  confidence, 
  setConfidence, 
  isSubmitted,
  isCorrect
}) {
  if (!question) return null;

  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div className="flex items-center text-primary-600 font-semibold">
          <Shield className="w-5 h-5 mr-2" />
          <span>{question.subdomain.replace('_', ' ').toUpperCase()}</span>
        </div>
        <div className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
          Difficulty: {question.difficulty}/5
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-lg font-medium text-slate-800 mb-6 leading-snug">
          {question.text}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            
            // Determine styles after submission
            let optionStyle = "border-slate-200 hover:border-primary-300 hover:bg-slate-50 text-slate-700";
            if (isSelected && !isSubmitted) {
              optionStyle = "border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500";
            } else if (isSubmitted) {
              if (isSelected && isCorrect) {
                 optionStyle = "border-success-600 bg-success-100 text-success-600 ring-1 ring-success-600";
              } else if (isSelected && !isCorrect) {
                 optionStyle = "border-danger-600 bg-danger-100 text-danger-600 ring-1 ring-danger-600";
              } else {
                 optionStyle = "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={option.id}
                disabled={isSubmitted}
                onClick={() => onOptionSelect(option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${optionStyle}`}
              >
                <span className="text-sm font-medium">{option.text}</span>
                {isSelected && !isSubmitted && (
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                )}
              </button>
            );
          })}
        </div>

        <ConfidenceSlider 
          confidence={confidence} 
          setConfidence={setConfidence} 
          disabled={isSubmitted} 
        />
      </div>
    </div>
  );
}
