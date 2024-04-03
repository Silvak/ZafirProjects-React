import { persist } from "zustand/middleware";

export const storeUser = persist(
  (set) => ({
    DataPerfilUser: [],
    User: {},
    Authenticated: false,

    setDataPerfilUser: (value) => set({ DataPerfilUser: value }),
    setUser: (value) => set({ User: value }),
    setAuthenticated: (value) => set({ Authenticated: value }),
  }),
  {
    name: "user-storage", // Nombre para identificar el almacenamiento
    getStorage: () => sessionStorage, // Utilizar sessionStorage para persistir el estado
  }
);
