import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  role: "admin" | "user" | null;
  setToken: (token: string | null) => void;
  setRole: (role: "admin" | "user" | null) => void;
  logout: () => void;
  hydrateFromCookies: () => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
  logout: () => {
    Cookies.remove("accessToken");
    set({ token: null, role: null });
  },
  hydrateFromCookies: () => {
    const cookieToken = Cookies.get("accessToken");
     const cookieRole = Cookies.get("role") as "admin" | "user" | undefined;
    if (cookieToken) {
      set({ token: cookieToken, role: cookieRole ?? "user" });
    }
  },
}));
