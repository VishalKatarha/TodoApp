
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [value, setValue] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/todo/${id}`,
        value
      );

      console.log("Status:", response.status);
      console.log("Data:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Todo updated successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Todo update nahi hua");
    }
  };

  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-full flex flex-col max-w-md mt-8 p-4 bg-blue-500 rounded gap-8 shadow-md">
        <h1 className="flex justify-center text-xl font-bold text-white">
          Update Todo
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            value={value.title}
            name="title"
            onChange={handleChange}
            placeholder="Enter your title"
            className="bg-blue-500 text-white p-2 rounded-lg placeholder:text-blue-300 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            value={value.description}
            name="description"
            onChange={handleChange}
            placeholder="Enter your description"
            className="bg-blue-500 text-white p-2 rounded-lg placeholder:text-blue-300 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
