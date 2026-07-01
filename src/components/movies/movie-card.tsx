import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Movie } from "@/types/movie";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMovieStore } from "@/store/movie-store";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const favorites = useMovieStore((state) => state.favorites);
  const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
  const favorite = favorites.some((m) => m.id === movie.id);

  return (
    <article>
      <Card className="overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="aspect-2/3 w-full object-cover"
        />
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="w-fit">
              {movie.genre}
            </Badge>
            <button type="button" onClick={() => toggleFavorite(movie)} aria-label="Toggle favorite">
              <Heart
                size={20}
                fill={favorite ? "#ef4444" : "none"}
                stroke={favorite ? "#ef4444" : "#9ca3af"}
              />
            </button>
          </div>
          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">{movie.synopsis}</p>
          <Link
            to={`/movies/${movie.id}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View details
          </Link>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;