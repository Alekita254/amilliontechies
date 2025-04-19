import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthorList } from "../components/AuthorList";
import { AuthorForm } from "../components/AuthorForm";
import { apiGetRequest, apiDeleteRequest } from "@/backend/functions";

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthors = async () => {
    const res = await apiGetRequest("authors/");
    if (res.data?.data) {
      setAuthors(res.data.data);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleEdit = (author) => {
    setSelectedAuthor(author);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this author?");
    if (!confirmed) return;

    await apiDeleteRequest(`authors/${id}/`);
    fetchAuthors();
  };

  const handleFormSubmit = () => {
    fetchAuthors();
    setOpenDialog(false);
    setSelectedAuthor(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Authors</h2>
        <Button
          onClick={() => {
            setSelectedAuthor(null);
            setOpenDialog(true);
          }}
        >
          + Add Author
        </Button>
      </div>

      <AuthorList authors={authors} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAuthor ? "Edit Author" : "Add Author"}</DialogTitle>
          </DialogHeader>
          <AuthorForm author={selectedAuthor} onSuccess={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthorPage;