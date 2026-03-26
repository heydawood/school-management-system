import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DateRange, type RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, startOfToday, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { Calendar } from 'lucide-react';
import { CrossIcon } from '@/Utils/Icons';
import { Button } from './button';

interface DateRangePickerProps {
  label: string;
  className?: string;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ label, className, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // Handle Date Selection
  const handleSelect = (ranges: RangeKeyDict) => {
    const startDate = ranges.selection.startDate ?? null;
    const endDate = ranges.selection.startDate === ranges.selection.endDate ? null : ranges.selection.endDate ?? null;

    setDateRange({ startDate, endDate });
    onDateChange(startDate, endDate);
  };

  // Reset Date Selection
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange({ startDate: null, endDate: null });
    onDateChange(null, null);
    setShowCalendar(false);
  };

  // Handle Filter Selection
  const handleFilter = (filter: string) => {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (filter) {
      case 'today':
        startDate = endDate = startOfToday();
        break;
      case 'yesterday':
        startDate = endDate = subDays(startOfToday(), 1);
        break;
      case 'thisWeek':
        startDate = startOfWeek(new Date());
        endDate = endOfWeek(new Date());
        break;
      case 'lastWeek':
        startDate = startOfWeek(subDays(new Date(), 7));
        endDate = endOfWeek(subDays(new Date(), 7));
        break;
      case 'thisMonth':
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case 'lastMonth':
        startDate = startOfMonth(subMonths(new Date(), 1));
        endDate = endOfMonth(subMonths(new Date(), 1));
        break;
      default:
        break;
    }

    setDateRange({ startDate, endDate });
    onDateChange(startDate, endDate);
  };

  // Calendar popup
  const calendarContent = (
    <div
      ref={calendarRef}
      className="fixed z-[9999] shadow-lg bg-white p-2 rounded-md flex"
      style={{
        top: triggerRef.current ? triggerRef.current.getBoundingClientRect().bottom + 8 : 100,
        left: triggerRef.current ? triggerRef.current.getBoundingClientRect().left : 100,
      }}
    >
      {/* Filters on the left */}
      <div className="w-[100px] flex flex-col gap-2">
        {['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'lastMonth'].map((filter) => (
          <button
            key={filter}
            className="rounded-lg text-paragraph font-semibold text-gray-975 hover:text-gray-500 bg-white hover:bg-primary-25 w-[100px] h-[40px]"
            onClick={() => handleFilter(filter)}
          >
            {filter.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="ml-4">
        <DateRange
          ranges={[
            {
              startDate: dateRange.startDate || new Date(),
              endDate: dateRange.endDate || dateRange.startDate || new Date(),
              key: 'selection',
            },
          ]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={false}
          rangeColors={['#179d7c']}
        />
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        className={`${className} flex items-center justify-between text-gray-975 border border-input text-paragraph font-medium min-w-[195px] max-w-fit h-[40px] rounded-lg py-2 px-3 cursor-pointer`}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <div>
          {dateRange.startDate && dateRange.endDate ? (
            `${format(dateRange.startDate, 'MM/dd/yyyy')} - ${format(dateRange.endDate, 'MM/dd/yyyy')}`
          ) : dateRange.startDate ? (
            `${format(dateRange.startDate, 'MM/dd/yyyy')}`
          ) : (
            <span className="text-sm font-normal text-gray-25">{label}</span>
          )}
        </div>

        <span className="flex gap-2">
          {dateRange.startDate && (
            <Button className="p-1 h-fit mx-2 hover:bg-neutral-975" variant={'ghost'} onClick={handleReset}>
              <CrossIcon size={24} />
            </Button>
          )}
        </span>
        <span>
          <Calendar />
        </span>
      </div>

      {/* Portal for Calendar */}
      {showCalendar && createPortal(calendarContent, document.body)}
    </div>
  );
};

export default DateRangePicker;
