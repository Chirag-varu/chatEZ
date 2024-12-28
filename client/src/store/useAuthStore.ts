import { create } from 'zustand';

// Define the shape of the Auth state
interface AuthState {
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  user: { id: string; name: string } | null;
  login: (user: { id: string; name: string }) => void;
  logout: () => void;
}

// Create the Auth store using Zustand
const useAuthStore = create<AuthState>((set) => ({
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  user: null,
  login: (user) => set({ isLoggingIn: true, user }),
  logout: () => set({ isLoggingIn: false, user: null }),
}));

export default useAuthStore;
