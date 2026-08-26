import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  captain: string;
  memberCount: number;
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    captain: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

const Team = model<TeamDocument>('Team', teamSchema);

export default Team;
