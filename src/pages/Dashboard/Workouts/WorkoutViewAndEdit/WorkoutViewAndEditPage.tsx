import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WorkoutForm from '@/components/features/Workouts/WorkoutForm';
import { useAppDispatch } from '@/Redux/Hooks';
import { useWorkoutManager } from '../WorkoutsManager';
import WorkoutExercise from '@/components/features/Workouts/WorkoutExercise';
import ExerciseForm from '@/components/features/Workouts/ExerciseForm';
import { Button } from '@/components/ui/button';
import type { WorkoutExercise as ExerciseType } from '../Types';
import Loader from '@/components/ui/loader/Loader';
import { ChevronLeft } from 'lucide-react';
import { usePage } from '@/Providers/PageProvider';

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="p-2 bg-neutral-200 hover:bg-neutral-300 text-black shadow-none" onClick={onClick}>
      <ChevronLeft size={20} />
    </Button>
  );
};

const WorkoutViewAndEditPage = () => {
  const [addExercise, setAddExercise] = useState(false);
  const [exerciseType, setExerciseType] = useState<'edit' | 'add'>('add');
  const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseType | null>(null);

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { pageInfo, setPageInfo } = usePage();
  const navigate = useNavigate();

  const {
    categories,
    workout,
    loading,
    handleGetWorkoutDetail,
    handleGetCategories,
    handleDeleteExercise,
    handleUpdateExercise,
    handleSaveExercise,
    handleUpdateWorkout,
    handleDeleteWorkout,
    handleUpdateWorkoutStatus,
  } = useWorkoutManager();

  useEffect(() => {
    if (id) {
      handleGetWorkoutDetail(Number(id));
      handleGetCategories();
      setPageInfo({ title: 'Workout Detail', withBackButton: true, backButton: <BackButton onClick={() => navigate(-1)} /> });
    }
  }, [id, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading && <Loader />}
      <Card className="px-4">
        <CardHeader className="border-b px-0">
          <CardTitle className="text-subheading">Workout Overview</CardTitle>
        </CardHeader>
        <CardContent className="px-0 mt-4">
          <WorkoutForm
            key={categories?.length}
            onUpdate={handleUpdateWorkout}
            onStatusChange={handleUpdateWorkoutStatus}
            onDelete={handleDeleteWorkout}
            categories={categories}
            onRefetchCategories={handleGetCategories}
            workout={workout}
          />
        </CardContent>
      </Card>
      <Card className="px-4">
        <CardHeader className="border-b px-0">
          <CardTitle className="text-subheading">Listed Exercises</CardTitle>
        </CardHeader>
        <CardContent className="px-0 mt-4">
          {workout?.workoutExercises?.length === 0 && !addExercise && <p className="text-center">No exercises added yet.</p>}
          {workout?.workoutExercises?.map((exercise) => (
            <WorkoutExercise
              key={exercise.workoutExerciseId}
              image={exercise.video}
              title={exercise.titleEn}
              duration={exercise.duration}
              description={exercise.description}
              onEdit={() => {
                setExerciseToEdit(exercise);
                setAddExercise(true);
                setExerciseType('edit');
              }}
              onDelete={() => handleDeleteExercise(exercise.workoutExerciseId)}
            />
          ))}
          {addExercise && (
            <ExerciseForm
              key={exerciseToEdit?.workoutExerciseId}
              exercise={exerciseToEdit}
              setAddExercise={setAddExercise}
              onUpdate={(data: any) => handleUpdateExercise(exerciseToEdit?.workoutExerciseId!, data)}
              onSave={(data: any) => handleSaveExercise(data)}
              type={exerciseType}
            />
          )}
          {!addExercise && (
            <Button
              className="w-full bg-primary-25 text-primary-800 hover:text-white h-[44px] mt-4 rounded-xl"
              onClick={() => {
                setAddExercise(true);
                setExerciseType('add');
                setExerciseToEdit(null);
              }}
            >
              Add Exercise
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutViewAndEditPage;
