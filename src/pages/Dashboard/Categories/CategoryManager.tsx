import { useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';
import type { Categories } from './Types';
import { deleteAdminCategory, getCategories, getPaginatedCategories, getSingleCategory, updateAdminCategory } from '@/Redux/Categories/Slice';

export const useCategoryManager = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [singleCategory, setSingleCategory] = useState<Categories>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get categories
  const handleGetCategories = () => {
    dispatch(getCategories())
      .unwrap()
      .then((res: Categories[]) => {
        setCategories(res);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {});
  };

  // Get paginated categories
  const handleGetPaginatedCategories = (filters: { isPaginated: boolean; page: number; limit: number; search: string }) => {
    dispatch(getPaginatedCategories(filters))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {});
  };

  // Get Category detail
  const handleGetSingleCategoryDetail = (id: number) => {
    setLoading(true);
    dispatch(getSingleCategory(id))
      .unwrap()
      .then((res: Categories) => {
        setSingleCategory(res);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update Workout
  const handleUpdateCategory = (id: number, payload: any) => {
    setLoading(true);
    dispatch(updateAdminCategory({ id, payload }))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Category updated successfully');
        handleGetSingleCategoryDetail(+singleCategory?.workoutCategoryId!);
      })
      .catch((err) => {
        customToast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Delete Workout
  const handleDeleteCategory = (id: number) => {
    setLoading(true);
    dispatch(deleteAdminCategory(id))
      .unwrap()
      .then((res) => {
        customToast.success(res.message || 'Category deleted successfully');

        navigate(routes.CategoryList());
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
    singleCategory,
    loading,
    handleGetCategories,
    handleGetPaginatedCategories,
    handleGetSingleCategoryDetail,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};
