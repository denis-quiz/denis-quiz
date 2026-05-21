"use client";

import { Question } from "@/lib/types/question";

type Props = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

export default function QuestionCreateForm({ questions, setQuestions }: Props) {
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        tempId: crypto.randomUUID(),
        content: "",
        answers: [{ content: "" }],
        correctAnswerIndex: 0,
      },
    ]);
  };

  const deleteQuestion = (tempId: string) => {
    setQuestions((prev) => prev.filter((q) => q.tempId !== tempId));
  };

  const addAnswer = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.tempId === questionId
          ? {
              ...q,
              answers: [...q.answers, { content: "" }],
            }
          : q,
      ),
    );
  };

  const deleteAnswer = (questionId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.tempId !== questionId) return q;

        const newAnswers = q.answers.filter((_, i) => i !== index);

        let correct = q.correctAnswerIndex;

        if (correct === index) correct = 0;
        else if (typeof correct === "number" && correct > index) correct--;

        return {
          ...q,
          answers: newAnswers,
          correctAnswerIndex: correct,
        };
      }),
    );
  };

  const setCorrectAnswer = (questionId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.tempId === questionId ? { ...q, correctAnswerIndex: index } : q,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div key={q.tempId} className="border p-4 space-y-3">
          <input
            className="border p-2 w-full"
            value={q.content}
            onChange={(e) =>
              setQuestions((prev) =>
                prev.map((x) =>
                  x.tempId === q.tempId ? { ...x, content: e.target.value } : x,
                ),
              )
            }
          />

          <div className="space-y-2">
            {q.answers.map((a, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="radio"
                  name={q.tempId}
                  checked={q.correctAnswerIndex === index}
                  onChange={() => setCorrectAnswer(q.tempId, index)}
                />

                <input
                  className="border p-2 flex-1"
                  value={a.content}
                  onChange={(e) =>
                    setQuestions((prev) =>
                      prev.map((x) =>
                        x.tempId === q.tempId
                          ? {
                              ...x,
                              answers: x.answers.map((y, i) =>
                                i === index ? { content: e.target.value } : y,
                              ),
                            }
                          : x,
                      ),
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() => deleteAnswer(q.tempId, index)}
                >
                  delete
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => addAnswer(q.tempId)}>
            add answer
          </button>

          <button type="button" onClick={() => deleteQuestion(q.tempId)}>
            delete question
          </button>
        </div>
      ))}

      <button type="button" onClick={addQuestion}>
        add question
      </button>
    </div>
  );
}
