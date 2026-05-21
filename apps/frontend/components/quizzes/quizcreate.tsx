"use client";

import { useState } from "react";
import { quizCreate } from "@/lib/quizzes/quiz-create";
import { buttonClass } from "@/lib/styles/form";
import { errorToast } from "@/lib/toasts/error";
import { successToast } from "@/lib/toasts/sucess";
import QuestionCreateForm from "@/components/quizzes/questioncreate";
import { Question } from "@/lib/types/question";

export default function QuizCreateForm() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      errorToast("Title is required");
      return;
    }

    if (title.trim().length < 3) {
      errorToast("Title must be at least 3 characters long");
      return;
    }

    try {
      await quizCreate({
        title: title.trim(),
        questions,
      });

      successToast("Quiz created successfully");

      setTitle("");
      setQuestions([]);
    } catch {
      errorToast("Something went wrong");
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label htmlFor="title">title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />

          <QuestionCreateForm
            questions={questions}
            setQuestions={setQuestions}
          />

          <button type="submit" className={buttonClass}>
            create
          </button>
        </form>
      </div>
    </div>
  );
}
