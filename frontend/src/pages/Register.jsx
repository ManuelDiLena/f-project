import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { registerUser } from '../api/auth';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

export default function Register() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (res.token) {
      setUser(res.user, res.token);
      navigate('/select-account-type');
    } else {
      alert(res.message || 'Registration failed');
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-green-50 to-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-center'>Register</h1>
        <p className='text-sm text-center text-gray-500 mt-1'>Join the community — find matches nearby</p>
        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          <FormInput label='Name' id='name' name='name' placeholder='Your name' value={form.name} onChange={handleChange} />
          <FormInput label='Email' id='email' name='email' type='email' placeholder='email@example.com' value={form.email} onChange={handleChange} />
          <FormInput label='Password' id='password' name='password' type='password' placeholder='Min 6 characters' value={form.password} onChange={handleChange} />
          <Button type='submit' text='Continue' />
        </form>
        <div className='mt-4 text-center text-sm'>
          <span className='text-gray-600'>Already have an account?</span>
          <button onClick={() => navigate('/login')} className='ml-2 text-indigo-600 font-medium cursor-pointer'>Login</button>
        </div>
      </div>
    </div>
  );
}