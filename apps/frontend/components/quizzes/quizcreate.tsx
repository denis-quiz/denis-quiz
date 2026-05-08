"use client";

import { useState } from "react";
import { quizCreate } from "@/lib/quizzes/quiz-create";
import { inputClass, labelClass } from "@/lib/styles/form";

export default function QuizCreateForm() {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await quizCreate(name);
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>

          <div className="mt-2">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  );
}
