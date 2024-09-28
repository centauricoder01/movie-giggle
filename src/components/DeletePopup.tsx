import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { deleteData } from "@/helper/Delete";
import { useToast } from "@/hooks/use-toast";

interface DeleteElement {
  id: string;
  onDeleteSomething: () => void;
  url: string;
}

export default function DeletePopup({
  id,
  url,
  onDeleteSomething,
}: DeleteElement) {
  const [isOpen, setIsOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState("");
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setMovieToDelete(id);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (movieToDelete) {
      deleteData(`${url}/${movieToDelete}`)
        .then((res) => {
          if (res.success) {
            onDeleteSomething();
            return toast({
              variant: "default",
              title: "Deleted",
              description: `${
                url === "movies" ? "Movie" : "Review"
              } Deleted successfully`,
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
    }
    setIsOpen(false);
    setMovieToDelete("");
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleDelete(id)}
      >
        <TrashIcon className="h-4 w-4 text-red-500" />
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete from
              our <span className="font-semibold">servers.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
