import { customToast } from '@/Common/Components/ShowToast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/Redux/Hooks';
import { getWorkoutCategories } from '@/Redux/Workouts/Slice';
import { useEffect, useState } from 'react';
import LearningHubForm from '@/components/features/LearningHub/LearningHubForm';

const CreateLearningHubPage = () => {
  const dispatch = useAppDispatch();

  return (
    <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Learning Hub Overview</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <LearningHubForm />
      </CardContent>
    </Card>
  );
};

export default CreateLearningHubPage;
