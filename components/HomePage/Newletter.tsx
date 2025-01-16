"use client";
import { useState } from "react";

export default function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const response = await fetch("https://cancelorder.vercel.app/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Error submitting:", err);
    }
  };

  return (
    <div
      className="relative w-full min-h-[300px] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/NewsLetter.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative text-center p-5 max-w-lg">
        {submitted ? (
          <div className="p-5 bg-black text-white rounded-lg">
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p>You've subscribed to our newsletter.</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Get our newsletter and updates
            </h1>
            <p className="mb-6">
              Access exclusive deals and more by subscribing to our newsletter.
            </p>
            {error && (
              <div className="mb-4 text-red-500 bg-red-100 p-3 rounded-md">
                {error}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 rounded-md text-black w-full sm:w-auto flex-1"
                required
              />
              <button
                type="submit"
                className="bg-gray-700 hover:bg-black text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
