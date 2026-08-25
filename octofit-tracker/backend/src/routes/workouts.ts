import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ focusArea: 1, difficulty: 1 });

    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts' });
  }
});

export default router;
