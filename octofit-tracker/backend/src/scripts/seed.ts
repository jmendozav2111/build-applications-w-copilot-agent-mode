import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      {
        name: 'Cardio Crew',
        description: 'Runners, cyclists, and rowers chasing weekly endurance goals.',
        captain: 'maya.chen',
        memberCount: 12,
        weeklyGoalMinutes: 1800,
      },
      {
        name: 'Strength Squad',
        description: 'A team focused on progressive strength training and mobility.',
        captain: 'diego.rivera',
        memberCount: 9,
        weeklyGoalMinutes: 1350,
      },
      {
        name: 'Mindful Movers',
        description: 'Low-impact workouts, yoga, and consistency-first activity tracking.',
        captain: 'ava.patel',
        memberCount: 15,
        weeklyGoalMinutes: 1500,
      },
    ]);

    await User.insertMany([
      {
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        fitnessGoal: 'Improve 10K pace',
        teamName: 'Cardio Crew',
      },
      {
        username: 'diego.rivera',
        email: 'diego.rivera@example.com',
        displayName: 'Diego Rivera',
        fitnessGoal: 'Build total-body strength',
        teamName: 'Strength Squad',
      },
      {
        username: 'ava.patel',
        email: 'ava.patel@example.com',
        displayName: 'Ava Patel',
        fitnessGoal: 'Stay active with low-impact training',
        teamName: 'Mindful Movers',
      },
      {
        username: 'noah.kim',
        email: 'noah.kim@example.com',
        displayName: 'Noah Kim',
        fitnessGoal: 'Increase weekly workout consistency',
        teamName: 'Cardio Crew',
      },
    ]);

    await Activity.insertMany([
      {
        username: 'maya.chen',
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-22T13:30:00.000Z'),
      },
      {
        username: 'diego.rivera',
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 390,
        activityDate: new Date('2026-08-23T18:15:00.000Z'),
      },
      {
        username: 'ava.patel',
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 160,
        activityDate: new Date('2026-08-24T12:00:00.000Z'),
      },
      {
        username: 'noah.kim',
        type: 'Cycling',
        durationMinutes: 60,
        caloriesBurned: 520,
        activityDate: new Date('2026-08-24T20:00:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        username: 'noah.kim',
        teamName: 'Cardio Crew',
        points: 1280,
        rank: 1,
        weeklyMinutes: 315,
      },
      {
        username: 'maya.chen',
        teamName: 'Cardio Crew',
        points: 1210,
        rank: 2,
        weeklyMinutes: 298,
      },
      {
        username: 'diego.rivera',
        teamName: 'Strength Squad',
        points: 990,
        rank: 3,
        weeklyMinutes: 255,
      },
      {
        username: 'ava.patel',
        teamName: 'Mindful Movers',
        points: 870,
        rank: 4,
        weeklyMinutes: 230,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        focusArea: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        recommendedForGoal: 'Improve 10K pace',
      },
      {
        title: 'Foundational Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 40,
        recommendedForGoal: 'Build total-body strength',
      },
      {
        title: 'Mobility Flow Reset',
        focusArea: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        recommendedForGoal: 'Stay active with low-impact training',
      },
      {
        title: 'Consistency Cardio Mix',
        focusArea: 'Cardio',
        difficulty: 'Beginner',
        durationMinutes: 30,
        recommendedForGoal: 'Increase weekly workout consistency',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
