"use client";

import { useState } from "react";
import { quizCreate } from "@/lib/quizzes/quiz-create";
import { BannerAlert, TraditionalAlert } from "@/components/ui/alerts";
import { buttonClass } from "@/lib/styles/form";

export default function QuizCreateForm() {
  const [title, setTitle] = useState("");

  const [alert, setAlert] = useState<{
    type: "error" | "success";
    title: string;
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setAlert(null);

    if (!title.trim()) {
      setAlert({
        type: "error",
        title: "Error",
        text: "Name is required",
      });
      return;
    }

    if (title.trim().length < 3) {
      setAlert({
        type: "error",
        title: "Error",
        text: "Name must be at least 3 characters long",
      });
      return;
    }

    try {
      await quizCreate(title.trim());

      setAlert({
        type: "success",
        title: "Success",
        text: "Quiz created successfully",
      });

      setTitle("");
    } catch (err) {
      setAlert({
        type: "error",
        title: "Error",
        text: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label htmlFor={title}>title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />

          <button type="submit" className={buttonClass}>
            create
          </button>
        </form>
        <div className="mt-4">
          {alert?.type === "error" && (
            <TraditionalAlert title={alert.title} text={alert.text} />
          )}

          {alert?.type === "success" && (
            <BannerAlert title={alert.title} text={alert.text} />
          )}
        </div>
      </div>
    </div>
  );
}
