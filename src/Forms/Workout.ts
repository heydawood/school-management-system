import type { WorkoutDetailResponse } from '@/pages/Dashboard/Workouts/Types';

export interface WorkoutFormTypes {
  title: string;
  image: string;
  category: string;
  level: string;
  duration: number | undefined;
}

export const WorkoutFormDefaultValues: WorkoutFormTypes = {
  title: '',
  image: '',
  category: '',
  level: '',
  duration: undefined,
};

export const SetWorkoutFormDefaultValues = (workout: WorkoutDetailResponse) => {
  return {
    title: workout.titleEn,
    category: workout.workoutCategory.workoutCategoryId,
    level: workout.workoutLevel,
    duration: workout.duration ?? 0,
    image: workout.imageShortUrl ?? '',
  };
};
