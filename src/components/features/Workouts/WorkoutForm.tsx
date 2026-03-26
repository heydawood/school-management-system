import { customToast } from '@/Common/Components/ShowToast';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Input from '@/components/ui/input/input';
import { SetWorkoutFormDefaultValues, WorkoutFormDefaultValues, type WorkoutFormTypes } from '@/Forms/Workout';
import type { AllCategoriesResponseItem, WorkoutDetailResponse } from '@/pages/Dashboard/Workouts/Types';
import { levels } from '@/pages/Dashboard/Workouts/Utils';
import { useAppDispatch } from '@/Redux/Hooks';
import { createAdminWorkout } from '@/Redux/Workouts/Slice';
import { useEffect, useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as routes from '@/routes/Index';
import { useCustomAlert } from '@/Common/Components/CustomAlert';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import AddCategoryModal from '@/components/Modals/AddCategoryModal';
import FileDropzone from '@/components/ui/FileDropzone';
import FileUploader from '@/components/ui/file_uploader/FileUploader';
import { commonFileUpload } from '@/Redux/Common/Slice';
import type { IFileUploadResponse } from '@/Utils/Types';
import RequiredAsterisk from '@/components/ui/requiredAsterisk';

interface Props {
  categories: AllCategoriesResponseItem[];
  workout?: WorkoutDetailResponse | undefined;
  onStatusChange?: (id: number, status: 'Published' | 'Draft') => void;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, payload: any) => void;
  onRefetchCategories?: () => void;
}

const WorkoutForm: FC<Props> = ({ categories, workout, onStatusChange, onDelete, onUpdate, onRefetchCategories }) => {
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const showAlert = useCustomAlert();

  const workoutForm = useForm<WorkoutFormTypes>({
    defaultValues: WorkoutFormDefaultValues,
    mode: 'onChange',
  });
  const {
    formState: { isSubmitting },
  } = workoutForm;

  const onSubmit = (data: WorkoutFormTypes) => {
    const payload = {
      titleEn: data.title,
      titleAr: null,
      titleUr: null,
      workoutCategoryId: data.category,
      workoutLevel: data.level,
      duration: data.duration,
      image: data.image,
      video: null,
    };
    if (!data.image) {
      workoutForm.setError('image', {
        type: 'manual',
        message: 'Please provide an image before submitting',
      });
      return;
    }
    if (id) {
      changeStatus('Published');
      return;
    } else {
      dispatch(createAdminWorkout(payload))
        .unwrap()
        .then((res: { message: string; data: { workoutId: number } }) => {
          customToast.success(res.message || 'Workout created successfully');
          navigate(routes.WorkoutEdit(res.data.workoutId));
        })
        .catch((err) => {
          customToast.error(err || 'Failed to create workout');
          workoutForm.reset();
        })
        .finally(() => {});
    }
  };

  // File Upload
  const handleFileUpload = (files: FileList) => {
    setUploading(true);

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    dispatch(commonFileUpload(formData))
      .unwrap()
      .then((res: { message: string; data: IFileUploadResponse }) => {
        workoutForm.setValue('image', res?.data?.shortUrl);
        setImage(res?.data?.url);
        workoutForm.clearErrors('image');
        customToast.success(res.message || 'File uploaded successfully');
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const changeStatus = (status: 'Published' | 'Draft') => {
    if (id) {
      onStatusChange?.(+id, status);
    }
  };

  const updateWorkout = () => {
    const data = workoutForm.getValues();
    if (!data.image) {
      workoutForm.setError('image', {
        type: 'manual',
        message: 'Please provide an image before submitting',
      });
      return;
    }

    const payload = {
      titleEn: data.title,
      titleAr: null,
      titleUr: null,
      workoutCategoryId: data.category,
      workoutLevel: data.level,
      duration: data.duration,
      image: data.image,
      video: null,
    };
    if (id) {
      onUpdate?.(+id, payload);
      setEditing(false);
    }
  };

  const deleteWorkout = () => {
    showAlert({
      title: 'Delete Workout',
      description: 'Are you sure you want to delete this workout? Deleted workout will no longer be able to access again.',
      confirmText: 'Yes',
      cancelText: 'No',
      customLogo: <Icon icon="/icons/trash.svg" />,
      logoClasses: 'bg-error-100 text-error',
      onConfirm: () => {
        onDelete?.(workout?.workoutId!);
      },
      classNames: {
        confirmButton: 'hover:bg-error bg-error-25 text-error-800 hover:text-white rounded-xl',
        cancelButton: 'border border-neutral-975 bg-transparent hover:bg-primary hover:border-primary hover:text-white rounded-xl',
      },
    });
  };

  useEffect(() => {
    if (workout) {
      setImage(workout.imageFullUrl);
      workoutForm.reset(SetWorkoutFormDefaultValues(workout));
    }
  }, [id, workout]);

  return (
    <div>
      {isSubmitting && <p>Submitting...</p>}
      <FormProvider {...workoutForm}>
        <form onSubmit={workoutForm.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                disabled={id && !editing}
                allowAsterisk
                type="text"
                placeholder="Enter workout name"
                label="Workout Name"
                classNames=" h-[44px]"
                rules={{ required: 'Workout name is required' }}
                name="title"
              />
            </div>
            <div>
              <Dropdown
                disabled={id && !editing}
                data={levels}
                placeholder="Select workout level"
                label="Level"
                name="level"
                classNames=" h-[44px]"
                rules={{ required: 'Workout level is required' }}
                allowAsterisk
              />
            </div>
            <div>
              <Dropdown
                disabled={id && !editing}
                data={categories.map((category) => {
                  const words = category.name?.split(' ') || [];
                  const truncatedName = words.length > 4 ? words.slice(0, 4).join(' ') + '...' : category.name;

                  return {
                    value: String(category.workoutCategoryId),
                    name: truncatedName,
                  };
                })}
                placeholder="Select category"
                rules={{ required: 'Workout category is required' }}
                label="Category"
                name="category"
                classNames=" h-[44px]"
                onAddItem={() => setShowCategoryModal(true)}
                addItemText="Add New Category"
                allowAsterisk
              />
            </div>
            <div>
              <Input disabled type="number" placeholder="Once you add exercise you will see time here" label="Workout Duration" classNames=" h-[44px]" name="duration" />
            </div>
          </div>
          <div className={`mt-4 ${workout ? '' : 'md:w-1/2'}`}>
            <FileDropzone title="Drag or upload workout image here." key={image} filePath={image} fileType="Image" />

            {uploading ? (
              <p className="text-center text-paragraph font-semibold text-gray-700">Uploading...</p>
            ) : (
              (!workout || editing) && (
                <FileUploader onFilesSelected={(files) => handleFileUpload(files)} accept="image/*" multiple={false}>
                  <p className="text-center text-paragraph font-semibold hover:underline hover:text-primary text-gray-700">
                    Upload Image <RequiredAsterisk />
                  </p>
                </FileUploader>
              )
            )}
          </div>
          <p className="text-error-500 mt-4 text-sm">{workoutForm.formState.errors.image?.message}</p>

          {workout?.status == 'Draft' || !id ? (
            <Button type="submit" className="w-full h-[44px] mt-4 rounded-xl">
              Publish Workout
            </Button>
          ) : editing ? (
            <Button onClick={updateWorkout} type="button" className="w-full h-[44px] mt-4 rounded-xl bg-primary-25 text-primary-800 hover:text-white">
              Update Workout
            </Button>
          ) : (
            <div className="mt-4 flex justify-between items-center gap-2">
              <Button onClick={() => changeStatus('Draft')} type="button" className="w-full h-[44px] mt-4 rounded-xl">
                Unpublish Workout
              </Button>
              <Button onClick={() => setEditing(true)} type="button" className="w-full h-[44px] mt-4 rounded-xl bg-primary-25 text-primary-800 hover:text-white">
                Edit Workout
              </Button>
              <Button onClick={() => deleteWorkout()} type="button" className="w-full h-[44px] mt-4 rounded-xl bg-error-25 text-error-800 hover:text-white hover:bg-error">
                Delete Workout
              </Button>
            </div>
          )}
        </form>
      </FormProvider>

      {showCategoryModal && <AddCategoryModal getCategories={onRefetchCategories!} close={() => setShowCategoryModal(false)} />}
    </div>
  );
};

export default WorkoutForm;
