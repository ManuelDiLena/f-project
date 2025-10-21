import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { loginUser } from '../api/auth';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    if (res.token) {
      setUser(res.user, res.token);
      if (!res.user.hasProfile) {
        if (res.user.role === 'fieldAdmin') navigate('/field/onboarding');
        else navigate('/player/onboarding');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert(res.message || 'Login failed');
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-green-50 to-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <p className='text-sm text-center text-gray-500 mt-1'>Log in to your account to join matches</p>
        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          <FormInput label='Email' id='email' name='email' type='email' placeholder='email@example.com' value={form.email} onChange={handleChange} />
          <FormInput label='Password' id='password' name='password' type='password' placeholder='Your password' value={form.password} onChange={handleChange} />
          <Button type='submit' text='Login' />
        </form>
        <div className='mt-4 text-center text-sm'>
          <span className='text-gray-600'>Don't have an account?</span>
          <button onClick={() => navigate('/register')} className='ml-2 text-indigo-600 font-medium cursor-pointer'>Register</button>
        </div>
      </div>
    </div>
  );
}