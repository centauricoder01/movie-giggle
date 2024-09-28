import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Zod schema to validate review data
const createReviewSchema = z.object({
  movieId: z.string(),
  reviewer: z.string().optional().nullable(),
  rating: z
    .number()
    .min(0)
    .max(10, { message: "Rating must be between 0 and 10" }),
  comments: z.string().min(1, { message: "Review comments are required" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body
    const data = createReviewSchema.parse(body);

    // Fetch the movie by its ID
    const movie = await prisma.movie.findUnique({
      where: { id: data.movieId },
      include: {
        reviews: true, // Include existing reviews
      },
    });

    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found",
        },
        { status: 404 }
      );
    }

    // Create the new review
    const newReview = await prisma.review.create({
      data: {
        movieId: data.movieId,
        reviewer: data.reviewer || "Anonymous",
        rating: data.rating,
        comments: data.comments,
      },
    });

    // Calculate the new average rating
    const allRatings = movie.reviews.map((review) => review.rating);
    const updatedRatings = [...allRatings, data.rating]; // Include the new rating
    const averageRating =
      updatedRatings.reduce((sum, rating) => sum + rating, 0) /
      updatedRatings.length;

    const roundedAverageRating = parseFloat(averageRating.toFixed(1));

    // Update the movie's average rating
    await prisma.movie.update({
      where: { id: data.movieId },
      data: {
        averageRating: roundedAverageRating, // Save the new average rating
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Review created and movie rating updated successfully",
        review: newReview,
        averageRating,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 400 }
    );
  }
}
