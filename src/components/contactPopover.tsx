import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { apiPostRequest } from "@/backend/functions";
import { toast } from "sonner";

export const ContactPopover = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const reasons = ["General Inquiry", "Collaboration", "Support", "Other"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPostRequest("contact/", formData);
      
      toast("Message sent successfully.");
      
      setOpen(false);
      setFormData({ name: "", email: "", reason: "", message: "" }); // Reset form
    } catch (error) {
      toast("Failed to send message. Try again.");
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-full md:w-1/3">Get Started</Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-4">
        <h2 className="text-lg font-semibold">Get Started / Contact Us</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <select name="reason" value={formData.reason} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="" disabled>Select a reason</option>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
          <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
