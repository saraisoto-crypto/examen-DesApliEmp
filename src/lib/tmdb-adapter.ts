import type { Movie } from "@/types/movie";
import type { TMDBMovie, TMDBGenre } from "@/types/tmdb";
import { getImageUrl } from "./tmdb";

export function adaptTMDBMovie(
  tmdbMovie: TMDBMovie,
  genresMap: Record<number, string>
): Movie {
  const genreName = tmdbMovie.genre_ids[0]
    ? genresMap[tmdbMovie.genre_ids[0]] ?? "Unknown"
    : "Unknown";

  return {
    id: String(tmdbMovie.id),
    title: tmdbMovie.title,
    genre: genreName,
    posterUrl: getImageUrl(tmdbMovie.poster_path),
    synopsis: tmdbMovie.overview || "No synopsis available.",
  };
}

export function buildGenresMap(genres: TMDBGenre[]): Record<number, string> {
  return genres.reduce<Record<number, string>>((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});
}