"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatingStorePage() {
  const [userID, setUserID] = useState("");
  const [storeName, setStoreName] = useState("");
  const [itemType, setItemType] = useState("");
  const [numCategories, setNumCategories] = useState("");
  const [location, setLocation] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          storeName,
          itemType,
          numCategories,
          location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create store.");
      }

      // ✅ Save storeID to localStorage
      if (data.storeID) {
        localStorage.setItem("storeID", data.storeID);
        alert("Store created successfully!");
        // ✅ Navigate only after storeID is stored
        router.push("/AddItemCategoryPage");
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#0F6466]">
          Create a New Store
        </h2>
        <form onSubmit={handleCreateStore} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

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

          <div>
            <label className="block text-gray-700 font-medium mb-1">Number of product-categories</label>
            <input
              type="number"
              value={numCategories}
              onChange={(e) => setNumCategories(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0F6466] text-white w-full py-2 px-4 rounded hover:bg-[#0e4f50]"
          >
            Create Store & Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
