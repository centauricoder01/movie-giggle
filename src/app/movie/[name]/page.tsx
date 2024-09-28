"use client";
import { ReviewCard } from "@/components/ReviewCard";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { getData } from "@/helper/Get";

export default function SingleMovie({ params }: { params: { name: string } }) {
  const [movies, setMovies] = useState<SingleMovieInterface>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovieReview = async () => {
    setIsLoading(true);
    try {
      const res = await getData(`movies/${params.name}`);
      setMovies(res.movie);
    } catch (err) {
      console.log(err, "This is error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieReview();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {isLoading ? (
        <p className="text-center font-extrabold text-3xl mt-5">
          loading Movie...
        </p>
      ) : (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{movies?.name}</h2>
            <span className="text-4xl font-bold text-purple-600">
              {movies?.averageRating === null ? 0 : movies?.averageRating}/10
            </span>
          </div>
          <div>
            {movies?.reviews.length === 0 ? (
              <p className="text-center">No Reviews Available</p>
            ) : (
              movies?.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onReviewUpdate={fetchMovieReview}
                />
              ))
            )}
          </div>
        </main>
      )}
    </div>
  );
}
