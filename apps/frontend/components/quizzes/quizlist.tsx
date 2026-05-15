"use client";
import { useEffect, useState } from "react";
import { quizzesGetBySession } from "@/lib/quizzes/quiz-get-by-session";
import type { Quiz } from "@/lib/types/quiz";
import { contentWrapper, pageContainer } from "@/lib/styles/div";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    async function loadQuizzes() {
      const data = await quizzesGetBySession();
      setQuizzes(data);
    }

    loadQuizzes();
  }, []);

  const headers = quizzes.length > 0 ? Object.keys(quizzes[0]) : [];

  return (
    <>
      <div className={pageContainer}>
        <div className={contentWrapper}>
          <h1>Quizzes</h1>

          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id}>
                  {headers.map((key) => (
                    <td key={key}>{String((quiz as never)[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
