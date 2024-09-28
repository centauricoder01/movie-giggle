interface MovieInterface {
  id: string;
  name: string;
  releaseDate: string;
  averageRating: number;
}

interface ReviewInterface {
  id: string;
  comments: string;
  rating: number;
  reviewer: string;
}

interface SingleMovieInterface {
  id: string;
  name: string;
  averageRating: number;
  reviews: ReviewInterface[];
}

type MovieType = {
  name: string;
  releaseDate: Date;
  averageRating: number | null;
};
