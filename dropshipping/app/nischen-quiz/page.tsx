import type { Metadata } from "next";
import NischenQuiz from "@/components/NischenQuiz";
import { QUIZ } from "@/data/quiz";

export const metadata: Metadata = {
  title: "Nischen-Quiz: Finde in 1 Minute deine E-Commerce-Nische",
  description:
    "5 Fragen, ehrliche Auswertung: Das Quiz findet die Dropshipping-Nische, die zu dir, deinem Budget und deinem Content-Stil passt – inkl. passender Produkte.",
  alternates: { canonical: "/nischen-quiz" },
};

export default function NischenQuizPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Nischen-Quiz</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Finde deine Nische – in 1 Minute
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {QUIZ.length} kurze Fragen zu deinen Interessen, deinem Budget und deinem
        Content-Stil. Am Ende bekommst du deine passende Nische, die Top-3-Auswertung
        und geprüfte Produkte für den Start – und kannst direkt den Store-Plan
        erstellen lassen.
      </p>
      <div className="mx-auto mt-8 max-w-2xl">
        <NischenQuiz />
      </div>
    </div>
  );
}
