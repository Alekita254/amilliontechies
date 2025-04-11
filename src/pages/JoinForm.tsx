import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { submitJoinUsForm } from '@/backend/functions';
import { toast } from "sonner";

// Dropdown options
const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Nigeria", "South Africa"];
const countiesInKenya = ["Nairobi", "Mombasa", "Kisumu", "Machakos", "Nakuru", "Kiambu", "Meru", "Uasin Gishu"];
const techAreas = ["Software Development", "Data Science", "AI/ML", "Cybersecurity", "Cloud Computing", "Web Development"];
const contributionOptions = ["Mentorship", "Development", "Research", "Consulting", "Marketing", "Other"];
const socialMediaOptions = ["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube", "Other"];

// Steps configuration
const steps = [
  { label: "What's your first name?", name: "first_name", placeholder: "Enter your first name" },
  { label: "What's your last name?", name: "last_name", placeholder: "Enter your last name" },
  { label: "What's your email address?", name: "email", placeholder: "Enter your email address" },
  { label: "What's your phone number?", name: "phone", placeholder: "Enter your phone number" },
  { label: "Select your country", name: "country", placeholder: "Select your country", options: countries },
  { label: "Select your county", name: "county", placeholder: "Select your county", options: countiesInKenya },
  { label: "What is your area of interest?", name: "area_of_interest", placeholder: "Select your area of interest", options: techAreas },
  { label: "Tell us about yourself", name: "about", placeholder: "Write a brief description about yourself" },
  { label: "How would you like to contribute?", name: "contribution", placeholder: "Select contribution", options: contributionOptions },
  { label: "Your LinkedIn Profile (optional)", name: "linkedin", placeholder: "Enter your LinkedIn profile URL" },
  { label: "How did you hear about us?", name: "heard_from", placeholder: "Select where you heard about us", options: socialMediaOptions },
];

export const JoinForm = ({ setThankYou }) => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    // Auto update location
    if (name === 'country') {
      if (value !== 'Kenya') {
        updatedForm.location = value;
        delete updatedForm.county;
      } else if (formData.county) {
        updatedForm.location = 'Kenya - ' + formData.county;
      }
    }

    if (name === 'county' && formData.country === 'Kenya') {
      updatedForm.location = 'Kenya - ' + value;
    }

    setFormData(updatedForm);
    setErrors(prev => ({ ...prev, [name]: null })); // clear error on change
  };

  const handleNext = () => {
    if (step === 4 && formData.country !== "Kenya") {
      setStep(step + 2); // skip county
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 6 && formData.country !== "Kenya") {
      setStep(step - 2); // skip county
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); // Set loading state to true
    try {
      const response = await submitJoinUsForm(formData);
      if (response.success) {
        toast.success("Message sent successfully.");
        setErrors({});
        setThankYou("Thank you for registering! We will be in touch.");
      } else {
        toast.error(response.message || "There was an error with your submission.");
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        general: "Unexpected error occurred. Please try again.",
      });
      toast.error("There was an error with your submission.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">{steps[step].label}</h2>

          {steps[step].options ? (
            <select
              name={steps[step].name}
              value={formData[steps[step].name] || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors[steps[step].name]
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-green-500'
              }`}
            >
              <option value="">{steps[step].placeholder}</option>
              {steps[step].options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name={steps[step].name}
              placeholder={steps[step].placeholder}
              value={formData[steps[step].name] || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors[steps[step].name]
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-green-500'
              }`}
            />
          )}

          {errors[steps[step].name] && (
            <p className="text-red-500 text-sm mt-1">{errors[steps[step].name]}</p>
          )}

          <div className="flex justify-between pt-4">
            {step > 0 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : <div />}
            {step < steps.length - 1 ? (
              <Button onClick={handleNext} className="bg-green-600 text-white hover:bg-green-700">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-black text-white hover:bg-gray-800" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>

          {errors.general && (
            <div className="text-red-600 text-sm text-center mt-4">
              {errors.general}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
