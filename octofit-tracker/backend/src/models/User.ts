import { Schema, model } from 'mongoose';

export interface UserDocument {
  username: string;
  email: string;
  displayName: string;
  fitnessGoal: string;
  teamName: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    teamName: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<UserDocument>('User', userSchema);

export default User;
