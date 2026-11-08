import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiDeleteRequest, apiGetRequest } from "@/backend/functions";
import { AuthorList, type Author } from "../components/AuthorList";
import { AuthorForm } from "../components/AuthorForm";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PageHeader } from "../components/PageHeader";

const AuthorPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [toDelete, setToDelete] = useState<Author | null>(null);

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await apiGetRequest("authors/");
    if (Array.isArray(res.data?.data)) setAuthors(res.data.data);
    else setError(res.message || "Failed to load authors");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const openForm = (author: Author | null) => {
    setSelectedAuthor(author);
    setOpenDialog(true);
  };

  const remove = async () => {
    if (!toDelete) return;
    const res = await apiDeleteRequest(`authors/${toDelete.id}/`);
    if (res.success) {
      toast.success("Author deleted");
      fetchAuthors();
    } else {
      toast.error(res.message || "Failed to delete the author");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Authors"
        description="The people who write blogs and events."
        action={
          <Button onClick={() => openForm(null)}>
            <Plus className="mr-2 h-4 w-4" /> New author
          </Button>
        }
      />

      <AuthorList
        authors={authors}
        loading={loading}
        error={error}
        onRetry={fetchAuthors}
        onCreate={() => openForm(null)}
        onEdit={openForm}
        onDelete={setToDelete}
      />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedAuthor ? "Edit author" : "New author"}</DialogTitle>
            <DialogDescription>
              {selectedAuthor ? "Update this author's details." : "Add someone who can be credited on posts."}
            </DialogDescription>
          </DialogHeader>
          <AuthorForm
            author={selectedAuthor}
            onCancel={() => setOpenDialog(false)}
            onSuccess={() => {
              setOpenDialog(false);
              setSelectedAuthor(null);
              fetchAuthors();
            }}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this author?"
        description={
          toDelete
            ? `“${toDelete.name}” will be removed, and so will every blog and event they wrote. This can't be undone.`
            : undefined
        }
        onConfirm={remove}
        onClose={() => setToDelete(null)}
      />
    </div>
  );
};

export default AuthorPage;
