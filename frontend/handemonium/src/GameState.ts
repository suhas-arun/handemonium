import { useState } from "react";

interface User {
  name: string;
  score: number;
}

const initialState: User[] = [
  { name: "Alex", score: 0 },
  { name: "Ben", score: 0 },
  { name: "Sid", score: 0 },
  { name: "Suhas", score: 0 },
  { name: "Viyan", score: 0 },
];

const [users, setUsers] = useState<User[]>(initialState);

export const getLeaderboard = (): User[] => {
  return [...users].sort((a, b) => b.score - a.score);
};

export const updateScore = (name: string, score: number): void => {
  setUsers(users => {
    const index = users.findIndex(user => user.name === name);
    if (index === -1) {
      return users;
    }

    const updatedUser = { ...users[index], score: users[index].score + score };
    return [
      ...users.slice(0, index),
      updatedUser,
      ...users.slice(index + 1),
    ];
  })
};
