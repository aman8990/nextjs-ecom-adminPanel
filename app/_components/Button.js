function Button({ children, onClick, type, disabled, color }) {
  const baseClass =
    'min-w-28 h-10 flex items-center justify-center rounded-md text-white';
  const colorClass = {
    green: 'bg-green-600 hover:bg-green-500',
    red: 'bg-red-600 hover:bg-red-500',
    inherit: 'w-full bg-accent-600 hover:bg-accent-500',
  };

  return (
    <button
      className={`${baseClass} ${
        colorClass[color] || 'bg-accent-600 hover:bg-accent-500'
      }`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
