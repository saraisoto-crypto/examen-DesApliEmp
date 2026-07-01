import axios from "axios";
import type { TMDBMovie, TMDBGenre, TMDBResponse } from "@/types/tmdb";

const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const tmdbApi = {
  getPopularMovies: (page = 1) =>
    tmdbClient
      .get<TMDBResponse<TMDBMovie>>("/movie/popular", { params: { language: "es-PE", page } })
      .then((res) => res.data),

  getGenres: () =>
    tmdbClient
      .get<{ genres: TMDBGenre[] }>("/genre/movie/list", { params: { language: "es-PE" } })
      .then((res) => res.data),

  searchMovies: (query: string, page = 1) =>
    tmdbClient
      .get<TMDBResponse<TMDBMovie>>("/search/movie", { params: { query, language: "es-PE", page } })
      .then((res) => res.data),
};

export function getImageUrl(
  path: string | null,
  size: "w200" | "w300" | "w500" | "original" = "w500"
): string {
  if (!path) return "https://placehold.co/500x750?text=No+Image";
  return `${import.meta.env.VITE_TMDB_IMAGE_URL}/${size}${path}`;
}