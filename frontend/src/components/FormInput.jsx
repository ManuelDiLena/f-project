export default function FormInput({ label, id, type, name, value, onChange, placeholder }) {
  return (
    <label className='block w-full'>
      <span className='text-sm font-medium text-gray-700'>{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        className='mt-1 block w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};