import { describe, it, expect, beforeEach } from "vitest";
import { useMovieStore } from "./movie-store";
import type { Movie } from "@/types/movie";

const mockMovie: Movie = {
  id: "1",
  title: "Test Movie",
  genre: "Action",
  posterUrl: "https://example.com/poster.jpg",
  synopsis: "A test movie",
};

describe("useMovieStore", () => {
  beforeEach(() => {
    useMovieStore.setState({ favorites: [] });
  });

  it("empieza con favoritos vacíos", () => {
    expect(useMovieStore.getState().favorites).toEqual([]);
  });

  it("agrega una película a favoritos", () => {
    useMovieStore.getState().toggleFavorite(mockMovie);
    expect(useMovieStore.getState().favorites).toHaveLength(1);
    expect(useMovieStore.getState().favorites[0].id).toBe("1");
  });

  it("quita una película de favoritos si ya estaba", () => {
    useMovieStore.getState().toggleFavorite(mockMovie);
    useMovieStore.getState().toggleFavorite(mockMovie);
    expect(useMovieStore.getState().favorites).toHaveLength(0);
  });
});