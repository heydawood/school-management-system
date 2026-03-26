import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import type { WorkoutCategory } from '@/pages/Dashboard/Workouts/Types';
import { levels } from '@/pages/Dashboard/Workouts/Utils';
import { truncateWords } from '@/Utils/Helpers';
import { useEffect, useState } from 'react';

interface Props {
  categories: WorkoutCategory[];
  onChange: (filters: any) => void;
}

const WorkoutsTableFilters = ({ categories, onChange }: Props) => {
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
        <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
          <SelectTrigger className="w-fit max-w-[180px] h-10 rounded-xl flex items-center justify-between gap-2">
            <span className="text-sm text-gray-25 shrink-0">Category:</span>
            <SelectValue placeholder="Category" className="truncate text-sm text-gray-700 max-w-[100px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.workoutCategoryId} value={category.workoutCategoryId}>
                {truncateWords(category.name, 3)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
          <SelectTrigger className="w-fit max-w-[180px] h-10 rounded-xl flex items-center justify-between gap-2">
            <span className="text-sm text-gray-25 shrink-0">Level:</span>
            <SelectValue placeholder="Level" className="truncate text-sm text-gray-700 max-w-[100px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {levels.map((level, index) => (
              <SelectItem key={index} value={level.value}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative">
          <span className="absolute top-1/2 ps-2 -translate-y-1/2">
            <Icon icon="/icons/search.svg" />
          </span>
          <Input
            className="w-[150px] ps-8 h-10 rounded-xl"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search workout here"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutsTableFilters;
