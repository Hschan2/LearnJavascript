import { create } from "zustand";
import { User } from "firebase/auth";

interface AppState {
  user: User | null;
  isLoading: boolean;
  darkMode: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  toggleDarkMode: () => void;
}

const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: true,
  darkMode: false,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useAppStore;
