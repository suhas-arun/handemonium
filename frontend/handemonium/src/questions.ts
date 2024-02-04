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
  {
    question: "What is the full form of OS?",
    options: [
      { text: "Order of Significance", isCorrect: false },
      { text: "Operating System", isCorrect: true },
      { text: "Open Software", isCorrect: false },
      { text: "Optical Sensor", isCorrect: false },
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
