import { useRouter } from "next/navigation";
import EditPopup from "@/components/EditPopup";
import DeletePopup from "@/components/DeletePopup";

export const MovieCard = ({
  movie,
  onMovieUpdate,
}: {
  movie: MovieInterface;
  onMovieUpdate: () => void;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  const date = new Date(movie.releaseDate);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
      <h3
        className="font-semibold text-lg cursor-pointer"
        onClick={handleClick}
      >
        {movie.name}
      </h3>
      <p className="text-sm text-gray-600">Released: {formattedDate}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold">
          Rating: {movie.averageRating === null ? 0 : movie.averageRating}/10
        </span>
        <div className="flex justify-center items-center">
          <EditPopup
            id={movie.id}
            name={movie.name}
            releaseDate={movie.releaseDate}
            onMovieUpdate={onMovieUpdate}
            url="movies"
          />
          <DeletePopup
            id={movie.id}
            onDeleteSomething={onMovieUpdate}
            url="movies"
          />
        </div>
      </div>
    </div>
  );
};
