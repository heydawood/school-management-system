import { customToast } from '@/Common/Components/ShowToast';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Input from '@/components/ui/input/input';
import { exerciseDuations } from '@/pages/Dashboard/Workouts/Utils';
import { useAppDispatch } from '@/Redux/Hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Textarea from '@/components/ui/textarea/Textarea';
import { ExerciseFormDefaultValues, SetExerciseFormDefaultValues, type ExerciseFormTypes } from '@/Forms/Exercise';
import FileUploader from '@/components/ui/file_uploader/FileUploader';
import FileDropzone from '@/components/ui/FileDropzone';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import { commonFileUpload } from '@/Redux/Common/Slice';
import type { IFileUploadResponse } from '@/Utils/Types';
import { useEffect, useState } from 'react';
import type { WorkoutExercise } from '@/pages/Dashboard/Workouts/Types';

interface Props {
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>;
  exercise: WorkoutExercise | null;
  onUpdate?: (payload: any) => void;
  onSave?: (payload: any) => void;
  type: 'edit' | 'add';
}

const ExerciseForm = ({ setAddExercise, onUpdate, onSave, exercise, type = 'add' }: Props) => {
  const [file, setFile] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: any }>();

  const exerciseForm = useForm<ExerciseFormTypes>({
    defaultValues: ExerciseFormDefaultValues,
    mode: 'onChange',
  });
  const {
    setValue,
    watch,
    formState: { isSubmitting },
  } = exerciseForm;

  const onSubmit = (data: ExerciseFormTypes) => {
    const payload = {
      titleEn: data.name,
      titleAr: null,
      titleUr: null,
      workoutId: +id,
      duration: data.duration,
      caloriesBurn: data.caloriesBurn,
      description: data.description,
      allowInstructionVoice: data.allowInstructionVoice,
      video: data.video,
    };
    if (!data.video) {
      exerciseForm.setError('video', {
        type: 'manual',
        message: 'Please provide a video before submitting',
      });
      return;
    }
    if (exercise) {
      onUpdate && onUpdate(payload);
      setAddExercise(false);
      exerciseForm.reset();
    } else {
      onSave && onSave(payload);
      setAddExercise(false);
      exerciseForm.reset();
    }
  };

  // File Upload
  const handleFileUpload = (files: FileList) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', files[0]);
    dispatch(commonFileUpload(formData))
      .unwrap()
      .then((res: { message: string; data: IFileUploadResponse }) => {
        setValue('video', res?.data?.shortUrl);
        setFile(res?.data?.url);
        exerciseForm.clearErrors('video');
        customToast.success(res.message || 'File uploaded successfully');
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  useEffect(() => {
    if (exercise && type == 'edit') {
      exerciseForm.reset(SetExerciseFormDefaultValues(exercise));
      setFile(exercise.video);
    }
  }, [exercise]);

  return (
    <div className="mt-4">
      <FormProvider {...exerciseForm}>
        <form onSubmit={exerciseForm.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                allowAsterisk
                type="text"
                placeholder="Enter exercise name"
                label="Exercise Name"
                classNames=" h-[44px]"
                rules={{ required: 'Exercise name is required' }}
                name="name"
              />
            </div>
            <div>
              <Dropdown
                key={Number(exercise?.workoutExerciseId)}
                data={exerciseDuations}
                placeholder="Select exercise duration"
                label="Exercise Duration"
                name="duration"
                classNames=" h-[44px]"
                rules={{ required: 'Exercise duration is required' }}
                allowAsterisk
              />
            </div>
          </div>
          <div>
            <Input type="number" placeholder="Calories burned" label="Calories Burned" classNames=" h-[44px]" name="caloriesBurn" />
          </div>
          <div className="mt-4">
            <Textarea
              label="Exercise Instructions"
              name="description"
              placeholder="Enter exercise instructions"
              rows="4"
              className=""
              rules={{ required: 'Exercise instructions are required' }}
            />
          </div>
          <div className="mt-4">
            <Checkbox name="allowInstructionVoice" label="Allow Instruction Voice" />
          </div>
          <div className="mt-4">
            <FileDropzone key={watch('video')} filePath={file} fileType="Video" />
            {!uploading ? (
              <FileUploader
                onFilesSelected={(files) => {
                  handleFileUpload(files);
                }}
                accept="video/*"
                multiple
                refProp={undefined}
              >
                <p className="text-center text-paragraph font-semibold hover:underline hover:text-primary text-gray-700">Upload</p>
              </FileUploader>
            ) : (
              <p className="text-center text-paragraph font-semibold hover:underline hover:text-primary text-gray-700">Uploading...</p>
            )}
          </div>
          <p className="text-error-500 mt-4 text-sm">{exerciseForm.formState.errors.video?.message}</p>

          <Button disabled={uploading} type="submit" className="w-full bg-primary-25 text-primary-800 hover:text-white h-[44px] mt-4 rounded-xl">
            Save Exercise
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ExerciseForm;
