import { create } from "zustand";
import { User } from "../models/User";

interface UserState {
  user: User | null;
  setUser: (u: User) => void;
  updateUser: (u: Omit<User,"created_at"| "is_deleted" | "role" | "moneyboxes">) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (u) => set({ user: u }),

  updateUser: (data) =>
    set((state) =>
      state.user
        ? { user: { ...state.user, ...data } }
        : { user: null }
    ),

  clearUser: () => set({ user: null }),
}));
