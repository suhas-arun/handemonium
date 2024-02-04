export type QuestionType = {
  question: string;
  options: { text: string; isCorrect: boolean }[];
};

export const questions: QuestionType[] = [
  {
    question: "Who invented the Banker's algorithm?",
    options: [
      { text: "William Morris", isCorrect: false },
      { text: "Dillon Shah", isCorrect: false },
      { text: "Edsger Dijkstra", isCorrect: true },
      { text: "Paul Bilokon", isCorrect: false },
    ],
  },
];

export function getCorrectAnswer(
  question: QuestionType
): [string, number] | null {
  for (const [optionIndex, option] of question.options.entries()) {
    if (option.isCorrect) {
      return [option.text, optionIndex];
    }
  }
  return null;
}
