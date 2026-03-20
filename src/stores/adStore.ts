import { create } from "zustand";

interface AdState {
  isVisible: boolean;
  countdown: number;
  canClose: boolean;
  show: () => void;
  hide: () => void;
  tick: () => void;
}

export const useAdStore = create<AdState>((set) => ({
  isVisible: false,
  countdown: 5,
  canClose: false,

  show: () => set({ isVisible: true, countdown: 5, canClose: false }),
  hide: () => set({ isVisible: false }),
  tick: () =>
    set((state) => {
      const next = state.countdown - 1;
      return next <= 0
        ? { countdown: 0, canClose: true }
        : { countdown: next };
    }),
}));
