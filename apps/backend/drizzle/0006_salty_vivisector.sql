ALTER TABLE "questions" DROP CONSTRAINT "questions_answer_id_answers_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_quiz_id_quizzes_id_fk";
--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "question_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "quiz_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "quiz_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzes" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "quizzes" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "quizzes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN "answer_id";