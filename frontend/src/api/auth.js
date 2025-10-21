import apiClient from '../utils/apiClient';

export const registerUser = async (data) => {
  try {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  } catch (err) {
    console.error('Error in registerUser:', err);
    return { success: false, message: err.response?.data?.message || 'Registration failed' };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  } catch (err) {
    console.error('Error in loginUser:', err);
    return { success: false, message: err.response?.data?.message || 'Login failed' };
  }
};