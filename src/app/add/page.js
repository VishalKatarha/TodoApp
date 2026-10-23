"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from 'react'
import toast from "react-hot-toast";

const page = () => {
  const [value,setValue] = useState({
    title:'',
    description:'',
  })

  const {push} = useRouter();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log('Submitted value:', value);

    try {
  const response = await axios.post(
    "http://localhost:3000/api/todo",
    value
  );

  console.log("Status:", response.status);
  console.log("Data:", response.data);

  if (response.status === 201) {
    toast.success("Todo added successfully!!");
    console.log("201 condition matched!");
    push("/");
  }
} catch (error) {
  console.error("Error adding todo:", error);
}
  }

   return (
    <div className="flex items-center justify-center py-2">
      <div className="w-full flex flex-col max-w-md mt-8 p-4 bg-blue-500 rounded gap-8 shadow-md">
        <h1 className=" flex justify-center text-xl font-bold text-white">Add Todo</h1>
        <label className="mt-[-30] relative block"> </label>
         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          </span> 

          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Enter your title"
            className="bg-blue-500 text-white p-2 rounded-lg placeholder:text-blue-300 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <label className="mt-[-30] relative block"> </label>
           <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>

             <input
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="Enter your description"
            className="bg-blue-500 text-white p-2 rounded-lg placeholder:text-blue-300 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
           <label className="relative block"> </label>
           
          <button onClick={handleSubmit} className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300" type="submit ">
            Add
          </button>
       
      </div>
    </div>
  );
};

export default page
