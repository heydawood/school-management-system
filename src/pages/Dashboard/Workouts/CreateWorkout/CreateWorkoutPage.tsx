import { customToast } from '@/Common/Components/ShowToast';
import WorkoutForm from '@/components/features/Workouts/WorkoutForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/Redux/Hooks';
import { getWorkoutCategories } from '@/Redux/Workouts/Slice';
import { useEffect, useState } from 'react';
import type { AllCategoriesResponseItem } from '../Types';
import { useWorkoutManager } from '../WorkoutsManager';

const CreateWorkoutPage = () => {
  const { categories, handleGetCategories } = useWorkoutManager();
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleGetCategories();
  }, [dispatch]);
  return (
    <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Workout Overview</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <WorkoutForm categories={categories} onRefetchCategories={handleGetCategories} />
      </CardContent>
    </Card>
  );
};

export default CreateWorkoutPage;
