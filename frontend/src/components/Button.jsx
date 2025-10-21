export default function Button({ text, onClick, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} className='w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-60 cursor-pointer'>
      {text}
    </button>
  );
};