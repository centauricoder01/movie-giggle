"use client";
import { Card, CardContent } from "@/components/ui/card";
import DeletePopup from "./DeletePopup";
import EditReview from "./EditReview";

export const ReviewCard = ({
  review,
  onReviewUpdate,
}: {
  review: ReviewInterface;
  onReviewUpdate: () => void;
}) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <p className="text-gray-700">{review.comments}</p>
        <span className="text-purple-600 font-bold">{review.rating}/10</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-500">By {review.reviewer}</p>

        <div className="flex justify-center items-center">
          <EditReview
            id={review.id}
            rating={review.rating}
            comment={review.comments}
            onUpdateReview={onReviewUpdate}
          />

          <DeletePopup
            id={review.id}
            onDeleteSomething={onReviewUpdate}
            url="reviews"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
