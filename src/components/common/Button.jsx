export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}
