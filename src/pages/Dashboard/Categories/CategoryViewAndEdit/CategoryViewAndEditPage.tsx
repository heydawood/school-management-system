import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/Redux/Hooks';
import Loader from '@/components/ui/loader/Loader';
import CategoryForm from '@/components/features/Categories/CategoryForm';
import { useCategoryManager } from '../CategoryManager';
import { usePage } from '@/Providers/PageProvider';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="p-2 bg-neutral-200 hover:bg-neutral-300 text-black shadow-none" onClick={onClick}>
      <ChevronLeft size={20} />
    </Button>
  );
};

const CategoryViewAndEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { pageInfo, setPageInfo } = usePage();
  const navigate = useNavigate();

  const { singleCategory, loading, handleGetSingleCategoryDetail, handleDeleteCategory, handleUpdateCategory } = useCategoryManager();

  useEffect(() => {
    if (id) {
      handleGetSingleCategoryDetail(Number(id));
      setPageInfo({ title: 'Category Detail', withBackButton: true, backButton: <BackButton onClick={() => navigate(-1)} /> });
    }
  }, [id, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading && <Loader />}
      <Card className="px-4">
        <CardHeader className="border-b px-0">
          <CardTitle className="text-subheading">Category Overview</CardTitle>
        </CardHeader>
        <CardContent className="px-0 mt-4">
          <CategoryForm onUpdate={handleUpdateCategory} onDelete={handleDeleteCategory} category={singleCategory} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryViewAndEditPage;
