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
  {
    question: "What language does Node.js use?",
    options: [
      { text: "Java", isCorrect: false },
      { text: "C++", isCorrect: false },
      { text: "Python", isCorrect: false },
      { text: "JavaScript", isCorrect: true },
    ],
  },
  {
    question: "What is the full form of HTML?",
    options: [
      { text: "Hyperlink and Text Markup Language", isCorrect: false },
      { text: "Hyper Text Markup Language", isCorrect: true },
      { text: "Home Tool Markup Language", isCorrect: false },
      { text: "Hyper Tool Markup Language", isCorrect: false },
    ]
  }
  {
    question: "What does RISC stand for?",
    options: [
      { text: "Reduced Instruction Set Code", isCorrect: false },
      { text: "Reduced Instruction Set Compiler", isCorrect: false },
      { text: "Reduced Instruction Set Control", isCorrect: false },
      { text: "Reduced Instruction Set Computer", isCorrect: true },
    ]
  }
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
