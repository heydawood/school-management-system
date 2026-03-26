import { customToast } from '@/Common/Components/ShowToast';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Input from '@/components/ui/input/input';
import { SetWorkoutFormDefaultValues, type WorkoutFormTypes } from '@/Forms/Workout';
import { useAppDispatch } from '@/Redux/Hooks';
import { useEffect, useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as routes from '@/routes/Index';
import { useCustomAlert } from '@/Common/Components/CustomAlert';
import { CategoryFormDefaultValues, SetCategoryFormDefaultValues, type CategoryFormTypes } from '@/Forms/Category';
import { categoryStatus } from '@/pages/Dashboard/Categories/Utils';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { createAdminCategory } from '@/Redux/Categories/Slice';
import type { Categories } from '@/pages/Dashboard/Categories/Types';

interface Props {
  category?: Categories;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, payload: any) => void;
}

const CategoryForm: FC<Props> = ({ category, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showAlert = useCustomAlert();
  const { id } = useParams<{ id: any }>();

  const categoryForm = useForm<CategoryFormTypes>({
    defaultValues: CategoryFormDefaultValues,
    mode: 'onChange',
  });
  const {
    formState: { isSubmitting },
  } = categoryForm;

  const onSubmit = (data: CategoryFormTypes) => {
    const payload = {
      nameEn: data.name,
      nameAr: null,
      nameUr: null,
      isActive: data.status == 'Active' ? true : false,
    };
    dispatch(createAdminCategory(payload))
      .unwrap()
      .then((res: { message: string; data: { workoutCategoryId: number } }) => {
        customToast.success(res.message || 'Category created successfully');
        navigate(routes.CategoryEdit(res.data.workoutCategoryId));
      })
      .catch((err) => {
        customToast.error(err || 'Failed to create category');
        categoryForm.reset();
      })
      .finally(() => {});
  };

  const updateWorkout = () => {
    const data = categoryForm.getValues();
    const payload = {
      nameEn: data.name,
      nameAr: null,
      nameUr: null,
      isActive: data.status == 'Active' ? true : false,
    };
    if (id) {
      onUpdate?.(+id, payload);
      setEditing(false);
    }
  };

  const deleteWorkout = () => {
    showAlert({
      title: 'Delete Category',
      description: 'Are you sure you want to delete this category? Deleted category will no longer be able to access again.',
      confirmText: 'Yes',
      cancelText: 'No',
      customLogo: <Icon icon="/icons/trash.svg" />,
      logoClasses: 'bg-error-100 text-error',
      onConfirm: () => {
        onDelete?.(+category?.workoutCategoryId!);
      },
      classNames: {
        confirmButton: 'hover:bg-error bg-error-25 text-error-800 hover:text-white rounded-xl',
        cancelButton: 'border border-neutral-975 bg-transparent hover:bg-primary hover:border-primary hover:text-white rounded-xl',
      },
    });
  };

  useEffect(() => {
    if (category) {
      categoryForm.reset(SetCategoryFormDefaultValues(category));
    }
  }, [id, category]);

  return (
    <div>
      {isSubmitting && <p>Submitting...</p>}
      <FormProvider {...categoryForm}>
        <form onSubmit={categoryForm.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                disabled={id && !editing}
                allowAsterisk
                type="text"
                placeholder="Enter category name"
                label="Category Name"
                classNames=" h-[44px]"
                rules={{
                  required: 'Category name is required',
                  maxLength: {
                    value: 255,
                    message: 'Category name cannot exceed 255 characters',
                  },
                }}
                name="name"
              />
            </div>
            <div>
              <Dropdown disabled={id && !editing} data={categoryStatus} placeholder="Select Status" label="Status" name="status" classNames="h-[44px]" />
            </div>
          </div>
          {!id ? (
            <Button type="submit" className="w-full h-[44px] mt-4 rounded-xl">
              Publish Category
            </Button>
          ) : editing ? (
            <Button onClick={updateWorkout} type="button" className="w-full h-[44px] mt-4 rounded-xl bg-primary-25 text-primary-800 hover:text-white">
              Update Category
            </Button>
          ) : (
            <div className="mt-4 flex justify-between items-center gap-2">
              <Button onClick={() => setEditing(true)} type="button" className="w-full h-[44px] mt-4 rounded-xl bg-primary-25 text-primary-800 hover:text-white">
                Edit Category
              </Button>
              <Button onClick={() => deleteWorkout()} type="button" className="w-full h-[44px] mt-4 rounded-xl bg-error-25 text-error-800 hover:text-white hover:bg-error">
                Delete Category
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default CategoryForm;
