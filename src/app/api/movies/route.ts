import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const createMovieSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  releaseDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  averageRating: z.number().max(10).optional().nullable(),
});

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "All Movies fetched Sucessfully",
        movies,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred",
      },
      { status: 500 }
    );
  }
}

// POST: Create a new movie
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body

    const data = createMovieSchema.parse(body);
    // Create a new movie
    const newMovie = await prisma.movie.create({
      data: {
        name: data.name,
        releaseDate: new Date(data.releaseDate),
        averageRating: data.averageRating || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Movie created successfully",
        newMovie,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
}
