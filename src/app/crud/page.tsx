"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FilmIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { postData } from "@/helper/Post";
import { useToast } from "@/hooks/use-toast";
import { getData } from "@/helper/Get";

export default function Component() {
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewComments, setReviewComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const { toast } = useToast();

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();

    if (movieName === "" || releaseDate === "") {
      return toast({
        variant: "destructive",
        title: "Empty",
        description: "All the Input feilds are required.",
      });
    }
    const movie = {
      name: movieName,
      releaseDate,
    };

    setLoading(true);
    postData("movies", movie)
      .then((res) => {
        if (res.success) {
          setMovieName("");
          setReleaseDate("");
        }
        setLoading(false);
        getData("movies")
          .then((res) => {
            setMovies(res.movies);
          })
          .then((err) => {
            console.log(err);
          });
        return toast({
          variant: "default",
          title: "Added",
          description: "Movie Added successfully",
        });
      })
      .catch(() => {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Error Occured",
          description: "Some error occured",
        });
      });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMovieId || reviewComments === "" || rating === "") {
      return toast({
        variant: "destructive",
        title: "Empty",
        description: "All fields are required.",
      });
    }

    const review = {
      movieId: selectedMovieId, // Use movie ID instead of name
      comments: reviewComments,
      reviewer: reviewerName,
      rating: Number(rating),
    };

    setLoading(true);

    postData("reviews", review)
      .then((res) => {
        if (res.success) {
          setReviewerName("");
          setReviewComments("");
          setRating("");
        }
        setLoading(false);
        toast({
          variant: "default",
          title: "Review Added",
          description: "Review added successfully",
        });
      })
      .catch(() => {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Error Occured",
          description: "Some error occured",
        });
      });
  };

  useEffect(() => {
    getData("movies")
      .then((res) => {
        setMovies(res.movies);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
          <Link href={"/"}>MOVIECRITIC</Link>
        </h1>
        <Tabs defaultValue="movie" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="movie">Add New Movie</TabsTrigger>
            <TabsTrigger value="review">Add New Review</TabsTrigger>
          </TabsList>
          <TabsContent value="movie">
            <Card>
              <CardHeader>
                <CardTitle>Add New Movie</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMovie} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="movieName">Movie Name</Label>
                    <div className="relative">
                      <FilmIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="movieName"
                        placeholder="Enter movie name"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="releaseDate">Release Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="releaseDate"
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    Create Movie
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Add New Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="movieSelect">Select a Movie</Label>
                    <Select
                      onValueChange={(value) => setSelectedMovieId(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a movie" />
                      </SelectTrigger>
                      <SelectContent>
                        {movies.map((ele) => (
                          <SelectItem value={ele.id} key={ele.id}>
                            {ele.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewerName">Your Name</Label>
                    <Input
                      id="reviewerName"
                      placeholder="Enter your name"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (out of 10)</Label>
                    <div className="relative">
                      <StarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="Enter rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewComments">Review Comments</Label>
                    <Textarea
                      id="reviewComments"
                      placeholder="Write your review here"
                      value={reviewComments}
                      onChange={(e) => setReviewComments(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    Add Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
