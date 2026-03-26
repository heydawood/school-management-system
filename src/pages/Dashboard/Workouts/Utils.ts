import { WorkoutLevels } from '@/Utils/Constants';
import { Value } from '@radix-ui/react-select';

export const workoutsAnalyticsData = [
  {
    title: 'Free Workout Listed',
    value: '12,450',
  },
  {
    title: 'Beginner Workout Listed',
    value: '12,450',
  },
  {
    title: 'Intermediate Workout Listed',
    value: '12,450',
  },
  {
    title: 'Advanced Workout Listed',
    value: '12,450',
  },
];

export const workoutsList = [
  {
    id: 1,
    name: 'Jumping Jack',
    category: 'Cardio',
    listedExercises: 5,
    usersPerformed: 100,
    duration: '30 mins',
    timeSpent: '25 mins',
    difficulty: 'Beginner',
    status: 'Published',
  },
  {
    id: 2,
    name: 'Mountain Climbing',
    category: 'Strength',
    listedExercises: 3,
    duration: '45 mins',
    usersPerformed: 50,
    timeSpent: '40 mins',
    difficulty: 'Intermediate',
    status: 'Draft',
  },
  {
    id: 3,
    name: 'Bicycle Crunches',
    category: 'Flexibility',
    listedExercises: 4,
    usersPerformed: 75,
    duration: '60 mins',
    timeSpent: '55 mins',
    difficulty: 'Advanced',
    status: 'Draft',
  },
];

export const getStatusBadge = (status: string) => {
  const statusMap: Record<string, string> = {
    Published: 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    Draft: 'bg-neutral-500 text-gray-950 hover:bg-neutral-80',
  };
  const statusClass = statusMap[status] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return statusClass;
};

export const getDifficultyBadge = (difficulty: string) => {
  const difficultyMap: Record<string, string> = {
    Beginner: 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    Intermediate: 'bg-warning-50 text-warning-800 hover:bg-warning-50',
    Advance: 'bg-blue-50 text-blue-800 hover:bg-blue-50',
    Professional: 'bg-blue-50 text-blue-800 hover:bg-blue-50',
  };
  const difficultyClass = difficultyMap[difficulty] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return difficultyClass;
};

export const levels = [
  {
    name: WorkoutLevels.BEGINNER,
    value: WorkoutLevels.BEGINNER,
  },
  {
    name: WorkoutLevels.INTERMEDIATE,
    value: WorkoutLevels.INTERMEDIATE,
  },
  {
    name: WorkoutLevels.ADVANCE,
    value: WorkoutLevels.ADVANCE,
  },
  {
    name: WorkoutLevels.PROFESSIONAL,
    value: WorkoutLevels.PROFESSIONAL,
  },
];

export const exerciseDuations = [
  {
    name: '5 Min',
    value: '5',
  },
  {
    name: '10 Min',
    value: '10',
  },
  {
    name: '15 Min',
    value: '15',
  },
  {
    name: '20 Min',
    value: '20',
  },
  {
    name: '30 Min',
    value: '30',
  },
  {
    name: '35 Min',
    value: '35',
  },
  {
    name: '40 Min',
    value: '40',
  },
  {
    name: '45 Min',
    value: '45',
  },
  {
    name: '50 Min',
    value: '50',
  },
  {
    name: '55 Min',
    value: '55',
  },
  {
    name: '60 Min',
    value: '60',
  },
];
