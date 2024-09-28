import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Zod schema to validate review update data
const updateReviewSchema = z.object({
  reviewer: z.string().optional().nullable(),
  rating: z
    .number()
    .min(0)
    .max(10, { message: "Rating must be between 0 and 10" })
    .optional(),
  comments: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await req.json();

    // Validate reviewId and update data
    const data = updateReviewSchema.parse(body);

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        ...(data.reviewer !== undefined && {
          reviewerName: data.reviewer,
        }),
        ...(data.rating !== undefined && { rating: data.rating }),
        ...(data.comments !== undefined && {
          comments: data.comments,
        }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Review updated successfully",
        review: updatedReview,
      },
      { status: 200 }
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Review with ID ${id} deleted successfully`,
      },
      { status: 200 }
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
