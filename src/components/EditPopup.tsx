import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon, X } from "lucide-react";
import { patchData } from "@/helper/Patch";
import { useToast } from "@/hooks/use-toast";

interface EditMovie {
  id: string;
  name: string;
  releaseDate: string;
}

interface EditMovieProps extends EditMovie {
  onMovieUpdate: () => void;
  url: string;
}

export default function EditPopup({
  id,
  name,
  releaseDate,
  onMovieUpdate,
  url,
}: EditMovieProps) {
  const [isOpen, setIsOpen] = useState(false);
  const formatDateForInput = (dateStr: string) => dateStr.split("T")[0];
  const { toast } = useToast();

  const [movie, setMovie] = useState<EditMovie>({
    id: id,
    name: name,
    releaseDate: formatDateForInput(releaseDate),
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
    patchData(`${url}/${movie.id}`, movie)
      .then((res) => {
        if (res.success) {
          onMovieUpdate();
          return toast({
            variant: "default",
            title: "Updated",
            description: "Movies updated successfully",
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
                  Edit Movie
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
                  <Label htmlFor="title">Movie Title</Label>
                  <Input
                    id="title"
                    value={movie.name}
                    onChange={(e) =>
                      setMovie({ ...movie, name: e.target.value })
                    }
                    placeholder="Enter movie title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={movie.releaseDate}
                    onChange={(e) =>
                      setMovie({ ...movie, releaseDate: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" className="w-full">
                  Update Movie
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
