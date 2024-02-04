interface User {
  name: string;
  score: number;
}

export default class GameState {
  private users: Map<string, number>;

  constructor() {
    this.users = new Map<string, number>([["Suhas", 0], ["Ben", 0], ["Alex", 0], ["Rushil", 0], ["Sid", 0], ["Viyan", 0]]);
  }

  getLeaderboard(): [string, number][] {
    return Array.from(this.users.entries()).sort((a, b) => b[1] - a[1]);
  }

  updateScore(name: string): void {
    if (this.users.has(name)) {
      const currentScore = this.users.get(name);
      this.users.set(name, currentScore! + 1);
    }
  }
}
