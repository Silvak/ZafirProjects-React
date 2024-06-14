import { persist } from 'zustand/middleware';

export const useStoreStates = persist(
  (set) => ({
    stateOpenDrawer: false,
    stateAccordion1: false,
    stateAccordion2: false,
    ChangeStateOpenDrawer: (value) => set({ stateOpenDrawer: value }),
    setAccordion1: (value) => set({ stateAccordion1: value }),
    setAccordion2: (value) => set({ stateAccordion2: value }),
  }),
  {
    name: 'states-storage',
    getStorage: () => localStorage,
  }
);
