import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Categories } from '@/pages/Dashboard/Categories/Types';
import { useEffect, useState } from 'react';

interface Props {
  categories: Categories[];
  onChange: (filters: any) => void;
}

const CategoryTableFilters = ({ categories, onChange }: Props) => {
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    search: '',
  });

  useEffect(() => {
    onChange({
      category: filters.category === 'all' ? null : filters.category,
      level: filters.level === 'all' ? null : filters.level,
      search: filters.search,
    });
  }, [filters]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Input className="w-fit h-10 rounded-xl" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="Search category here" />
      </div>
    </div>
  );
};

export default CategoryTableFilters;
