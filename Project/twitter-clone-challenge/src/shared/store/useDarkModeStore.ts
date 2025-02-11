import { create } from "zustand";

type darkModeStore = {
  darkMode: boolean;
  setDarkMode: () => void;
};

const useDarkModeStore = create<darkModeStore>((set) => ({
  darkMode: false,
  setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useDarkModeStore;
