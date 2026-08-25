import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  title: string;
  focusArea: string;
  difficulty: string;
  durationMinutes: number;
  recommendedForGoal: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    recommendedForGoal: { type: String, required: true },
  },
  { timestamps: true }
);

const Workout = model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;
