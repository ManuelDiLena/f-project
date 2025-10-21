import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function AccountType() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('player');

  const handleContinue = () => {
    localStorage.setItem('selectedRole', selectedRole);
    if (selectedRole === 'player') {
      navigate('/player/onboarding');
    } else if (selectedRole === 'fieldAdmin') {
      navigate('/field/onboarding');
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-green-50 to-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-center'>Choose your account type</h1>
        <p className='text-sm text-center text-gray-500 mt-1'>
          Select how you’ll use the app — you can always manage teams or fields later.
        </p>
        <div className='mt-8 space-y-4'>
          {/* Player option */}
          <div
            onClick={() => setSelectedRole('player')}
            className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition ${
              selectedRole === 'player'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className='flex items-center space-x-3'>
              <span className='text-2xl'>⚽</span>
              <div>
                <p className='font-semibold'>Player</p>
                <p className='text-sm text-gray-500'>Find and join football matches nearby</p>
              </div>
            </div>
            <input
              type='radio'
              name='role'
              checked={selectedRole === 'player'}
              onChange={() => setSelectedRole('player')}
              className='accent-indigo-600 w-5 h-5'
            />
          </div>
          {/* Field admin option */}
          <div
            onClick={() => setSelectedRole('fieldAdmin')}
            className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition ${
              selectedRole === 'fieldAdmin'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className='flex items-center space-x-3'>
              <span className='text-2xl'>🏟️</span>
              <div>
                <p className='font-semibold'>Field Admin</p>
                <p className='text-sm text-gray-500'>Create and manage football fields and matches</p>
              </div>
            </div>
            <input
              type='radio'
              name='role'
              checked={selectedRole === 'fieldAdmin'}
              onChange={() => setSelectedRole('fieldAdmin')}
              className='accent-indigo-600 w-5 h-5'
            />
          </div>
        </div>
        <div className='mt-8'>
          <Button text='Continue' type='button' onClick={handleContinue} />
        </div>
      </div>
    </div>
  );
}