export function Card({ children, className = '', title }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 font-semibold text-slate-800">
          {title}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
