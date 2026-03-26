import { useState } from 'react';
import type { AllCategoriesResponseItem, WorkoutDetailResponse, WorkoutListResponse } from './Types';
import { useAppDispatch } from '@/Redux/Hooks';
import {
  createWorkoutExercise,
  deleteAdminWorkout,
  deleteWorkoutExercise,
  getWorkoutCategories,
  getWorkoutDetail,
  getWorkoutList,
  updateAdminWorkout,
  updateAdminWorkoutStatus,
  updateWorkoutExercise,
} from '@/Redux/Workouts/Slice';
import { customToast } from '@/Common/Components/ShowToast';
import type { WorkoutLevels } from '@/Utils/Constants';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';

export const useWorkoutManager = () => {
  const [categories, setCategories] = useState<AllCategoriesResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState<WorkoutDetailResponse>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get categoties
  const handleGetCategories = () => {
    dispatch(getWorkoutCategories())
      .unwrap()
      .then((res: AllCategoriesResponseItem[]) => {
        setCategories(res);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {});
  };

  // Get workout list
  const handleGetWorkoutList = (filters: { page: number; limit: number; category: number | null; level: WorkoutLevels | null; search: string }) => {
    dispatch(getWorkoutList(filters))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {});
  };

  // Get workout detail
  const handleGetWorkoutDetail = (id: number) => {
    setLoading(true);
    dispatch(getWorkoutDetail(id))
      .unwrap()
      .then((res: WorkoutDetailResponse) => {
        setWorkout(res);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update Workout
  const handleUpdateWorkout = (id: number, payload: any) => {
    setLoading(true);
    dispatch(updateAdminWorkout({ id, payload }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Workout updated successfully');
        handleGetWorkoutDetail(workout?.workoutId!);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update Workout
  const handleSaveExercise = (payload: any) => {
    setLoading(true);
    dispatch(createWorkoutExercise({ ...payload }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Exercise created successfully');
        handleGetWorkoutDetail(workout?.workoutId!);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update Workout
  const handleUpdateWorkoutStatus = (id: number, status: 'Published' | 'Draft') => {
    setLoading(true);
    dispatch(updateAdminWorkoutStatus({ id, status }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Workout updated successfully');
        handleGetWorkoutDetail(workout?.workoutId!);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Delete Workout
  const handleDeleteWorkout = (id: number) => {
    setLoading(true);
    dispatch(deleteAdminWorkout(id))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Workout deleted successfully');

        navigate(routes.WorkoutList());
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update exercise
  const handleUpdateExercise = (id: number, payload: any) => {
    setLoading(true);
    dispatch(updateWorkoutExercise({ id, payload }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Exercise updated successfully');
        handleGetWorkoutDetail(workout?.workoutId!);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update exercise
  const handleDeleteExercise = (id: number) => {
    setLoading(true);
    dispatch(deleteWorkoutExercise(id))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Exercise deleted successfully');
        handleGetWorkoutDetail(workout?.workoutId!);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    categories,
    workout,
    loading,
    handleGetCategories,
    handleGetWorkoutDetail,
    handleGetWorkoutList,
    handleUpdateWorkout,
    handleDeleteWorkout,
    handleUpdateExercise,
    handleDeleteExercise,
    handleUpdateWorkoutStatus,
    handleSaveExercise,
  };
};
