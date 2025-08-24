'use client';

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const { push } = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputVal.trim() === "") return; // prevent empty navigation
    push(`/prediction/${inputVal}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Enter Your Name
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Type Your Name"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-slate-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Predict Data
          </button>
        </form>
      </div>
    </div>
  );
}
