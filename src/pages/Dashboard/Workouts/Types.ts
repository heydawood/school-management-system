import type { Pagination } from '@/Utils/Types';

export interface AllCategoriesResponseItem {
  workoutCategoryId: number;
  name: string;
  isActive: boolean;
}

export interface WorkoutDetailResponse {
  workoutId: number;
  titleEn: string;
  titleAr: any;
  titleUr: any;
  status: 'Published' | 'Draft';
  duration: number;
  workoutLevel: string;
  imageShortUrl: string;
  imageFullUrl: string;
  video: any;
  workoutCategory: {
    workoutCategoryId: string;
    nameEn: string;
    nameAr: string;
    nameUr: string;
  };
  workoutExercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  workoutExerciseId: number;
  titleEn: string;
  titleAr: string;
  titleUr: string;
  video: string;
  duration: any;
  videoShortUrl: string;
  caloriesBurn: number;
  description: string;
  allowInstructionVoice: boolean;
}

// Workout list response
export interface WorkoutListResponse {
  totalWorkouts: string;
  beginnerWorkouts: string;
  intermediateWorkouts: string;
  professionalWorkouts: string;
  workouts: Workout[];
  categories: WorkoutCategory[];
  levels: WorkoutLevel[];
  meta: Pagination;
}

export interface Workout {
  workoutId: string;
  name: string;
  categoryName: string;
  duration?: number;
  difficulty: string;
  userPerformed: number;
  listedExercises: number;
  timeSpent: number;
  status: string;
}

export interface WorkoutCategory {
  workoutCategoryId: string;
  name: string;
  isActive: boolean;
}

export interface WorkoutLevel {
  Beginner: string;
  Intermediate: string;
  Professional: string;
}
