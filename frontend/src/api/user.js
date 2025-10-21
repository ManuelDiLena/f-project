import apiClient from '../utils/apiClient';

export const updateUserRole = async (userId, role, token) => {
  try {
    const res = await apiClient.put(`/users/${userId}/role`, { role }, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (err) {
    console.error('Error updating user role:', err);
    return { success: false, message: err.response?.data?.message || 'Failed to update role' };
  }
};