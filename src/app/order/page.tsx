"use client";

import React, { useState } from "react";

export default function OrderPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await fetch("/api/order", {
      method: "POST",
      body: formData,
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold">Order Received</h1>
          <p className="mt-4">
            We&apos;ll contact you shortly to confirm your custom stand.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Custom Stand Order</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          required
          className="w-full border p-3"
        />

        <input
          name="email"
          placeholder="Email"
          required
          className="w-full border p-3"
        />

        <select name="standType" className="w-full border p-3">
          <option>Business Card Stand</option>
          <option>Card Display Stand</option>
          <option>Box Display Stand</option>
        </select>

        <select name="color" className="w-full border p-3">
          <option>Black</option>
          <option>White</option>
          <option>Blue</option>
          <option>Custom Color</option>
        </select>

        <input type="file" name="logo" className="w-full border p-3" />

        <textarea
          name="notes"
          placeholder="Additional requests"
          className="w-full border p-3"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 w-full"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}