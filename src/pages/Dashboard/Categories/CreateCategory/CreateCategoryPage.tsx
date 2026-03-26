import CategoryForm from '@/components/features/Categories/CategoryForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/Redux/Hooks';
import { useEffect } from 'react';
import { useCategoryManager } from '../CategoryManager';

const CreateCategoryPage = () => {
  const { categories, handleGetCategories } = useCategoryManager();
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleGetCategories();
  }, [dispatch]);
  return (
    <Card className="px-4">
      <CardHeader className="border-b px-0">
        <CardTitle className="text-subheading">Category Overview</CardTitle>
      </CardHeader>
      <CardContent className="px-0 mt-4">
        <CategoryForm />
      </CardContent>
    </Card>
  );
};

export default CreateCategoryPage;
