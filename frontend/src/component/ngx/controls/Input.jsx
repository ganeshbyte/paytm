export default function Input({
  id,
  type,
  required,
  placeholder,
  name,
  autoComplete,
  register,
}) {
  return (
    <input
      id={id}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      {...register(name, { required: required })}
      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
}
