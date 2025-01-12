function Input({
  label,
  id,
  type,
  register,
  errors,
  disabled,
  value,
  placeholder,
  validationRules,
}) {
  return (
    <div>
      <label className="text-lg font-medium">
        {label}{' '}
        <span className="text-red-500 text-sm">{errors?.[id]?.message}</span>
      </label>
      <div>
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={id}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id, validationRules)}
          className={`p-0.5 md:p-1 rounded-md w-full text-gray-900 outline-none border-2 border-solid focus:border-2 focus:border-solid focus:border-orange-300 block form-input ${
            disabled ? 'bg-blue-100 text-gray-500 cursor-not-allowed' : ''
          }`}
        />
      </div>
    </div>
  );
}

export default Input;
