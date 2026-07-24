import { create } from 'zustand';
import api from '../lib/api.js';

const useAuthStore = create((set) => ({
  user: null,

  // Start with checking because auth status is unknown on first load
  isChecking: true,

  setUser: (user) => set({ user }),

  logout: () => set({ user: null }),

  checkAuth: async () => {
    set({ isChecking: true });

    try {
      const { data } = await api.get('/api/auth/me');

      console.log("AUTH ME RESPONSE:", data);

      set({
        user: data.user,
      });

      console.log("USER SET:", data.user);

    } catch (error) {
      console.log("AUTH CHECK FAILED:", error.response?.data || error.message);

      set({
        user: null,
      });

    } finally {
      set({
        isChecking: false,
      });
    }
  },
}));

export default useAuthStore;