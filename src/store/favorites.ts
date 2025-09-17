import { create } from "zustand";
import type { Post } from "@/services/jsonplaceholder";

interface FavoritesState {
  favorites: Post[];
  toggleFavorite: (post: Post) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  toggleFavorite: (post) => {
    const current = get().favorites;
    const exists = current.some((p) => p.id === post.id);
    set({
      favorites: exists
        ? current.filter((p) => p.id !== post.id)
        : [...current, post],
    });
  },
}));
