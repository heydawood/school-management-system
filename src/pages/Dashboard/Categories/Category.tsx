import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import CategoryTable from '@/components/features/Categories/CategoryTable';
import CategoryTableFilters from '@/components/features/Categories/CategoryTableFilters';
import { useCategoryManager } from './CategoryManager';
import * as routes from '@/routes/Index';

const Header = ({
  onChange,
  ActionButtons,
  logo,
  logoClasses,
  title,
}: {
  onChange: (e: any) => void;
  ActionButtons?: ReactNode;
  logo: ReactNode;
  logoClasses: string;
  title: string;
}) => (
  <div className="flex gap-4 justify-between items-center flex-wrap pb-4 mb-4 border-b border-neutral-975">
    <div className="flex items-center gap-3">
      <div className={`h-12 w-12 flex justify-center items-center rounded-full ${logoClasses}`}>{logo}</div>
      <h3 className="text-heading">{title}</h3>
    </div>
    {ActionButtons}
  </div>
);

const CategoryPage = () => {
  const { categories, loading, pagination } = useAppSelector((state) => state.CategoryRecords);
  const [filters, setFilters] = useState<{ search: string }>({ search: '' });
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleGetPaginatedCategories } = useCategoryManager();

  const onFiltersChange = (filters: { search: string }) => {
    setFilters(filters);
    handleGetPaginatedCategories({ isPaginated: true, page: 1, limit: pagination.limit, search: filters.search });
  };

  useEffect(() => {
    handleGetPaginatedCategories({ isPaginated: true, page: 1, limit: pagination.limit, search: '' });
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
        <Header
          title="All Categories"
          ActionButtons={
            <div className="flex gap-3 items-center">
              <CategoryTableFilters onChange={(filters) => onFiltersChange(filters)} categories={categories} />
              <Button onClick={() => navigate(routes.CategoryCreate())} className="bg-primary rounded-xl px-5 py-5" type="button">
                <Icon icon="/icons/add-circle.svg" className="mr-2 text-white" />
                Add Category
              </Button>
            </div>
          }
          onChange={(e: any) => {}}
          logo={<Icon icon="/icons/dumbell.svg" className="text-primary-800" />}
          logoClasses="bg-primary-25"
        />
        <CategoryTable loading={loading} filters={filters} categories={categories} pagination={pagination} />
      </div>
    </div>
  );
};

export default CategoryPage;
