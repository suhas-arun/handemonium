import { createContext, useContext } from "react";

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

export let UserState = createContext<User[]>(initialState);

export const getLeaderboard = (): User[] => {
  const users = useContext(UserState);
  return users.sort((a, b) => b.score - a.score);
};

export const updateScore = (name: string, score: number): void => {
  const users = useContext(UserState);
  const updatedUsers = users.map((user) => {
    if (user.name === name) {
      return { ...user, score: user.score + score };
    }
    return user;
  });
  UserState = createContext<User[]>(updatedUsers);
};
