export function ConfidenceSlider({ confidence, setConfidence, disabled }) {
  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        How confident are you in this answer? ({Math.round(confidence * 100)}%)
      </label>
      <input
        type="range"
        min="0.5"
        max="1.0"
        step="0.05"
        value={confidence}
        onChange={(e) => setConfidence(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 accent-primary-600"
      />
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>50% (Guessing)</span>
        <span>100% (Certain)</span>
      </div>
    </div>
  );
}
