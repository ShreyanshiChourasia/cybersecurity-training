import { AlertCircle } from 'lucide-react';

export function DistractorFeedback({ feedback }) {
  if (!feedback) return null;

  return (
    <div className="mt-4 p-4 bg-danger-100 text-danger-600 rounded-lg flex items-start">
      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
      <span className="text-sm font-medium">{feedback}</span>
    </div>
  );
}
