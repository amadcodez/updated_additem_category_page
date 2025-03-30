// ✅ Frontend: AddItemCategoryPage.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function AddItemCategoryPage() {
  const [itemType, setItemType] = useState("");
  const [userID, setUserID] = useState("");
  const [storeID, setStoreID] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedStoreID = localStorage.getItem("storeID");

    console.log("📦 userID from localStorage:", storedUserID);
    console.log("🏬 storeID from localStorage:", storedStoreID);

    if (storedUserID) setUserID(storedUserID);
    if (storedStoreID) setStoreID(storedStoreID);
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeID) {
      alert("Store ID not found. Please create a store first.");
      return;
    }

    try {
      const response = await fetch("/api/add-item-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, itemType, storeID }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to add category");

      setSuccessMessage("Item Category Added Successfully!");
      setItemType("");

      // Hide after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#0F6466]">
          Add Item Category
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Item Type</label>
            <input
              type="text"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0F6466] text-white w-full py-2 px-4 rounded hover:bg-[#0e4f50]"
          >
            Add Item Category
          </button>
        </form>
      </div>
    </div>
  );
}
