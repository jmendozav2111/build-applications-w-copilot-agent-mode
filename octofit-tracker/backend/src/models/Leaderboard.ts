import { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  username: string;
  teamName: string;
  points: number;
  rank: number;
  weeklyMinutes: number;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    weeklyMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export default Leaderboard;
