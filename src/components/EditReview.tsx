import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon, X } from "lucide-react";
import { patchData } from "@/helper/Patch";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";

interface EditReview {
  id: string;
  rating: number;
  comment: string;
}

interface EditReviewProps extends EditReview {
  onUpdateReview: () => void;
}

export default function EditReview({
  id,
  rating,
  comment,
  onUpdateReview,
}: EditReviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [review, setreview] = useState<EditReview>({
    id: id,
    rating: rating,
    comment: comment,
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const backendVlaue = {
      comments: review.comment,
      rating,
    };

    if (backendVlaue.comments === "" || rating < 0) {
      return toast({
        variant: "destructive",
        title: "Empty",
        description: "Some values are Empty",
      });
    }
    console.log(backendVlaue);
    patchData(`reviews/${review.id}`, backendVlaue)
      .then((res) => {
        console.log(res);
        if (res.success) {
          onUpdateReview();
          return toast({
            variant: "default",
            title: "Updated",
            description: "review updated successfully",
          });
        }
      })
      .catch(() => {
        return toast({
          variant: "destructive",
          title: "Error",
          description: "Some Error Occured",
        });
      });
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setIsOpen(true)}
      >
        <PencilIcon className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Edit review
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Edit Review</Label>
                  <Textarea
                    id="title"
                    value={review.comment}
                    onChange={(e) =>
                      setreview({ ...review, comment: e.target.value })
                    }
                    placeholder="Enter review"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="releaseDate">Edit Rating</Label>
                  <Input
                    id="title"
                    type="number"
                    value={review.rating}
                    onChange={(e) =>
                      setreview({ ...review, rating: Number(e.target.value) })
                    }
                    placeholder="Enter rating"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Update Review
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
