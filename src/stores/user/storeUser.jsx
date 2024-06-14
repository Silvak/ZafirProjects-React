import { persist } from 'zustand/middleware';

export const storeUser = persist(
  (set) => ({
    DataPerfilUser: [],
    User: {},
    Authenticated: false,
    setDataPerfilUser: (value) => set({ DataPerfilUser: value }),
    setUser: (value) => set({ User: value }),
    setAuthenticated: (value) => set({ Authenticated: value }),

    // Estados para el drawer
    stateOpen: false,
    ChangeStateOpen: (value) => set({ stateOpen: value }),

    // Estados para los acordeones de All Projects
    stateAccordion1: false,
    stateAccordion2: false,
    setAccordion1: (value) => set({ stateAccordion1: value }),
    setAccordion2: (value) => set({ stateAccordion2: value }),
  }),
  {
    name: 'user-storage', // Nombre para identificar el almacenamiento
    getStorage: () => sessionStorage, // Utilizar sessionStorage para persistir el estado
  }
);
