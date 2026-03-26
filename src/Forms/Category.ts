import type { Categories } from '@/pages/Dashboard/Categories/Types';

export interface CategoryFormTypes {
  name: string;
  status: string | boolean;
}

export const CategoryFormDefaultValues: CategoryFormTypes = {
  name: '',
  status: true,
};

export const SetCategoryFormDefaultValues = (category: Categories) => {
  return {
    name: category.name,
    workoutCategoryId: category.workoutCategoryId,
    status: category.isActive ? 'Active' : 'Inactive',
  };
};
