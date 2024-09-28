import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateMovieSchema = z.object({
  name: z.string().optional(),
  releaseDate: z.string().optional(),
  averageRating: z.number().max(10).optional(),
});

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch the movie along with its reviews
    const movie = await prisma.movie.findUnique({
      where: { id: id },
      include: {
        reviews: true, // This includes related reviews in the response
      },
    });

    if (!movie) {
      return NextResponse.json(
        { success: false, message: "Movie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Movie fetched successfully", movie },
      { status: 200 }
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    // Parse the request body using Zod
    const data = updateMovieSchema.parse(body);

    // Prepare the update data, excluding undefined fields
    const updateData: Partial<MovieType> = {
      ...(data.name && { name: data.name }),
      ...(data.releaseDate && { releaseDate: new Date(data.releaseDate) }),
      ...(data.averageRating && { averageRating: data.averageRating }),
    };

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Movie with ID ${id} updated successfully`,
        movie: updatedMovie,
      },
      { status: 200 }
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.movie.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { success: true, message: `Movie with ID ${id} deleted successfully` },
      { status: 200 }
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
