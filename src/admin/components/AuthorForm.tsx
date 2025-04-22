import { useState, useEffect } from "react";
import { apiFormDataPatchRequest, apiFormDataPostRequest } from "@/backend/functions";
import { toast } from "sonner";

export function AuthorForm({ author, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profile_picture: null,
  });

  const [existingPic, setExistingPic] = useState(null);

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || "",
        email: author.email || "",
        bio: author.bio || "",
        profile_picture: null,
      });
      setExistingPic(author.profile_picture || null);
    }
  }, [author]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_picture: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("bio", formData.bio);
  
    if (formData.profile_picture) {
      payload.append("profile_picture", formData.profile_picture);
    }

    console.log("This is the data to be sent for either saving or update ", payload);
  
    try {
      const endpoint = author ? `authors/${author.id}/` : "authors/";
      const response = author
        ? await apiFormDataPatchRequest(endpoint, payload)
        : await apiFormDataPostRequest(endpoint, payload); // <-- use this for POST
  
      if (response.success || response.id) {
        toast.success(`Author ${author ? "updated" : "created"} successfully`);
        onSuccess?.();
      } else {
        console.error("Backend response:", response);
        toast.error("Submission failed: Check required fields");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong while submitting.");
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded p-2"
        placeholder="Email"
        required
      />
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="w-full border rounded p-2"
        placeholder="Bio"
      />

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {existingPic && !formData.profile_picture && (
        <img
          src={existingPic}
          alt="Current profile"
          className="mt-2 h-20 w-20 rounded-full object-cover"
        />
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        {author ? "Update" : "Create"} Author
      </button>
    </form>
  );
}
