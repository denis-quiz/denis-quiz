"use client";

import { Question } from "@/lib/types/question";

type Props = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

export default function QuestionCreateForm({ questions, setQuestions }: Props) {
  // ➕ Add question
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: "",
        correctAnswerId: null,
        answers: [],
      },
    ]);
  };

  // ❌ Remove question
  const removeQuestion = (questionId: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  // ➕ Add answer
  const addAnswer = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: [
                ...q.answers,
                {
                  id: Date.now(),
                  content: "",
                },
              ],
            }
          : q,
      ),
    );
  };

  // ❌ Remove answer
  const removeAnswer = (questionId: number, answerId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.filter((a) => a.id !== answerId),
              // reset correct answer if it was deleted
              correctAnswerId:
                q.correctAnswerId === answerId ? null : q.correctAnswerId,
            }
          : q,
      ),
    );
  };

  // 🎯 Set correct answer
  const setCorrectAnswer = (questionId: number, answerId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              correctAnswerId: answerId,
            }
          : q,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <div key={question.id} className="border p-4 space-y-3">
          {/* QUESTION INPUT */}
          <input
            type="text"
            placeholder="Question"
            value={question.content}
            onChange={(e) => {
              const value = e.target.value;

              setQuestions((prev) =>
                prev.map((q) =>
                  q.id === question.id ? { ...q, content: value } : q,
                ),
              );
            }}
            className="border p-2 w-full"
          />

          {/* ANSWERS */}
          <div className="space-y-2 ml-4">
            {question.answers.map((answer) => (
              <div key={answer.id} className="flex gap-2 items-center">
                {/* SELECT CORRECT ANSWER */}
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={question.correctAnswerId === answer.id}
                  onChange={() => setCorrectAnswer(question.id, answer.id)}
                />

                {/* ANSWER TEXT */}
                <input
                  type="text"
                  placeholder="Answer"
                  value={answer.content}
                  onChange={(e) => {
                    const value = e.target.value;

                    setQuestions((prev) =>
                      prev.map((q) =>
                        q.id === question.id
                          ? {
                              ...q,
                              answers: q.answers.map((a) =>
                                a.id === answer.id
                                  ? { ...a, content: value }
                                  : a,
                              ),
                            }
                          : q,
                      ),
                    );
                  }}
                  className="border p-2 flex-1"
                />

                <button
                  type="button"
                  onClick={() => removeAnswer(question.id, answer.id)}
                  className="text-red-500"
                >
                  delete
                </button>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addAnswer(question.id)}
              className="text-blue-500"
            >
              add answer
            </button>

            <button
              type="button"
              onClick={() => removeQuestion(question.id)}
              className="text-red-500"
            >
              delete question
            </button>
          </div>
        </div>
      ))}

      {/* ADD QUESTION */}
      <button type="button" onClick={addQuestion} className="border px-3 py-2">
        add question
      </button>
    </div>
  );
}
