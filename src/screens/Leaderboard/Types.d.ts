type Leaderboard = {
  id: string;
  createdAt: Date;
  username: string | null;
  score: number;
  note: string;
};

export { Leaderboard };
