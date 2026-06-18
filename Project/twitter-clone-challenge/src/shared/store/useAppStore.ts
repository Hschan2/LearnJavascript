import { create } from "zustand";
import { User } from "firebase/auth";

interface AppState {
  user: User | null;
  isLoading: boolean;
  darkMode: boolean;
  profileCache: Record<string, string>;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  toggleDarkMode: () => void;
  setProfileCache: (userId: string, imageUrl: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: true,
  darkMode: false,
  profileCache: {},
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setProfileCache: (userId, imageUrl) =>
    set((state) => ({
      profileCache: { ...state.profileCache, [userId]: imageUrl },
    })),
}));

export default useAppStore;
