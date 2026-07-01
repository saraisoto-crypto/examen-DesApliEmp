import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@/components/layout/page-container";
import MoviesList from "@/components/movies/movies-list";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";
import { tmdbApi } from "@/lib/tmdb";
import { adaptTMDBMovie, buildGenresMap } from "@/lib/tmdb-adapter";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: () => tmdbApi.getGenres(),
  });

  const { data: moviesData, isLoading, isError, error } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => tmdbApi.getPopularMovies(),
  });

  const genresMap = useMemo(
    () => (genresData ? buildGenresMap(genresData.genres) : {}),
    [genresData]
  );

  const availableMovies = useMemo(() => {
    if (!moviesData) return [];
    return moviesData.results.map((movie) => adaptTMDBMovie(movie, genresMap));
  }, [moviesData, genresMap]);

  const genres = useMemo(() => {
    return Array.from(new Set(availableMovies.map((movie) => movie.genre))).sort();
  }, [availableMovies]);

  const filteredMovies = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return availableMovies.filter((movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(normalizedSearchTerm);
      const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
      return matchesTitle && matchesGenre;
    });
  }, [availableMovies, searchTerm, selectedGenre]);

  if (isLoading) {
    return (
      <PageContainer>
        <p className="py-16 text-center text-muted-foreground">Cargando películas...</p>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <p className="py-16 text-center text-red-500">
          Error al cargar películas: {(error as Error).message}
        </p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MoviesPageHeader />
      <MoviesSearch
        genres={genres}
        resultsCount={filteredMovies.length}
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        onSearchTermChange={setSearchTerm}
      />
      <MoviesList movies={filteredMovies} />
    </PageContainer>
  );
};

export default MoviesPage;