"use client";
import { createSection } from "@/app/admin/sections/create/create-section";
import { useState } from "react";

export default function Sections() {
  const [sectionName, setSectionName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!sectionName.trim()) {
      alert("Section name cannot be empty");
      return;
    }

    const response = await createSection(sectionName);
    if (response?.error) {
      alert(response.error);
    } else {
      setSectionName(""); // Clear input field
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="sectionName">Section Name</label>
        <input
          type="text"
          placeholder="name"
          name="sectionName"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)} // Update state
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
