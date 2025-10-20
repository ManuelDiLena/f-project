import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData) => set({ user: userData }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;


