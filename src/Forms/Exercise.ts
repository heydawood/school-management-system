import type { WorkoutExercise } from '@/pages/Dashboard/Workouts/Types';

export interface ExerciseFormTypes {
  name: string;
  duration: string;
  description: string;
  allowInstructionVoice: boolean;
  caloriesBurn: number;
  video: string;
}

export const ExerciseFormDefaultValues: ExerciseFormTypes = {
  name: '',
  duration: '',
  description: '',
  caloriesBurn: 0,
  allowInstructionVoice: false,
  video: '',
};

export const SetExerciseFormDefaultValues = (workout: WorkoutExercise) => {
  return {
    name: workout.titleEn || '',
    duration: String(workout.duration) || '',
    description: workout.description || '',
    caloriesBurn: workout.caloriesBurn || 0,
    allowInstructionVoice: workout.allowInstructionVoice || false,
    video: workout.videoShortUrl || '',
  };
};
