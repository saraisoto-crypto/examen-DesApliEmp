import { create } from "zustand";
import type { Movie } from "@/types/movie";

interface MovieStore {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  favorites: [],
  toggleFavorite: (movie) =>
    set((state) => {
      const exists = state.favorites.some((m) => m.id === movie.id);
      if (exists) {
        return { favorites: state.favorites.filter((m) => m.id !== movie.id) };
      }
      return { favorites: [...state.favorites, movie] };
    }),
}));