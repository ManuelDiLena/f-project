import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AccountType from './pages/AccountType';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/select-account-type' element={<AccountType />} />
        <Route path='*' element={<Navigate to='/login' replace />}  />
      </Routes>
    </BrowserRouter>
  );
}
