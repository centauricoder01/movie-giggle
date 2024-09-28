"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { getData } from "@/helper/Get";
import { SkeletonCard } from "@/components/Skeleton";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await getData("movies");
      setMovies(res.movies);
    } catch (err) {
      console.log(err, "This is error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies?.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          The best movie reviews site!
        </h2>
        <div className="mb-8 relative">
          <Input
            type="text"
            placeholder="Search for your favourite movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredMovies.length > 0 ? (
            filteredMovies?.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieUpdate={fetchMovies}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-600 py-12">
              No movies available. Try a different search term or check back
              later!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
