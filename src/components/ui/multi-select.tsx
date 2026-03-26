// import React, { useState } from 'react'
// import clsx from 'clsx'
// import { RxCross2 } from 'react-icons/rx'

// interface Option {
//   id: number
//   name: string
// }

// interface MultiSelectProps {
//   options: Option[]
//   onChange: (selectedOptions: Option[]) => void
//   placeholder?: string
//   label?: string
//   name: string
//   classNames?: string
//   isSearchable?: boolean
//   icon?: React.ReactElement
//   iconPosition?: 'left' | 'right'
// }

// const MultiSelect: React.FC<MultiSelectProps> = ({
//   options,
//   onChange,
//   placeholder = 'Select options',
//   label,
//   name,
//   classNames,
//   isSearchable = true,
//   icon,
//   iconPosition = 'left',
// }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

//   const toggleOption = (option: Option) => {
//     const isAlreadySelected = selectedOptions.some(
//       (selected) => selected.id === option.id,
//     )
//     const updatedOptions = isAlreadySelected
//       ? selectedOptions.filter((selected) => selected.id !== option.id)
//       : [...selectedOptions, option]

//     setSelectedOptions(updatedOptions)
//     onChange(updatedOptions)
//   }

//   const handleRemove = (id: number) => {
//     const updatedOptions = selectedOptions.filter((option) => option.id !== id)
//     setSelectedOptions(updatedOptions)
//     onChange(updatedOptions)
//   }

//   const filteredOptions = options.filter(
//     (option) =>
//       option.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !selectedOptions.some((selected) => selected.id === option.id),
//   )

//   return (
//     <div className='mb-4'>
//       {label && <label className='text-sm font-semibold'>{label}</label>}
//       <div className='relative mt-2'>
//         <div
//           className={clsx(
//             'flex items-center bg-input appearance-none border border-input-border py-3 px-3 text-sm cursor-pointer rounded-lg',
//             'focus:border-primary focus:outline-none outline-none',
//             classNames,
//           )}
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           {icon && iconPosition === 'left' && (
//             <div className='mr-3 text-muted'>{icon}</div>
//           )}
//           <span className='flex-1'>
//             {selectedOptions.length
//               ? selectedOptions.map((opt) => opt.name).join(', ')
//               : placeholder}
//           </span>
//           {icon && iconPosition === 'right' && (
//             <div className='ml-3 text-muted'>{icon}</div>
//           )}
//         </div>

//         {isOpen && (
//           <div className='absolute z-10 mt-2 w-full bg-white rounded-xl shadow-md border border-gray-light'>
//             {isSearchable && (
//               <div className='p-2'>
//                 <input
//                   type='text'
//                   placeholder='Search...'
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className='w-full px-3 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
//                 />
//               </div>
//             )}
//             <ul>
//               {filteredOptions.length ? (
//                 filteredOptions.map((option) => (
//                   <li
//                     key={option.id}
//                     className='p-2 hover:bg-gray-light cursor-pointer'
//                     onClick={() => toggleOption(option)}
//                   >
//                     {option.name}
//                   </li>
//                 ))
//               ) : (
//                 <div className='p-2 text-sm text-gray-500'>
//                   No options found
//                 </div>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className='mt-2 flex flex-wrap'>
//         {selectedOptions.map((option) => (
//           <div
//             key={option.id}
//             className='text-[10px] font-medium bg-primary text-black h-[23px] rounded-[6px] px-[8px] py-[4px] mr-2 mb-2 flex items-center justify-between'
//           >
//             {option.name}
//             <button
//               className='ml-2 text-white focus:outline-none'
//               onClick={() => handleRemove(option.id)}
//             >
//               <RxCross2 className='text-black' size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MultiSelect

'use client';
import React, { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type OptionType = {
  value: string;
  label: string;
  role?: string;
};

const TAG_COLORS = [
  // 'bg-blue-100 text-blue-800 border-blue-200',
  // 'bg-green-100 text-green-800 border-green-200',
  // 'bg-yellow-100 text-yellow-800 border-yellow-200',
  // 'bg-red-100 text-red-800 border-red-200',
  // 'bg-purple-100 text-purple-800 border-purple-200',
  // 'bg-pink-100 text-pink-800 border-pink-200',
  // 'bg-indigo-100 text-indigo-800 border-indigo-200',
  // 'bg-teal-100 text-teal-800 border-teal-200',
  // 'bg-orange-100 text-orange-800 border-orange-200',
  // 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'border border-dashed border-warning-500 text-warning-500 font-normal text-[12px] 2xl:text-[14px] bg-warning-25',
];

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isSelectedItemShow?: boolean;
}

export function MultiSelect({ options, selected, onChange, placeholder = 'Select options...', className, disabled = false, isSelectedItemShow = true }: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Get a color deterministically based on option value
  const getTagColor = (value: string) => {
    const index = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % TAG_COLORS.length;
    return TAG_COLORS[index];
  };

  const selectedLabels = options
    .filter((option) => selected.includes(option.value))
    .map((option) => ({
      value: option.value,
      label: option.label,
      role: option.role,
      color: getTagColor(option.value),
    }));

  return (
    <div className={cn('space-y-4', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            // className='w-full justify-between font-normal z-50'
            className="justify-between bg-white w-full h-[40px] rounded-[8px] py-[8px] px-[12px] text-[12px] text-gray-500 font-normal border border-gray-300"
            disabled={disabled}
          >
            {selected.length > 0 ? `${selected.length} selected` : placeholder}

            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {/* <PopoverContent className='w-full p-0'> */}
        <PopoverContent className="p-0" align="start" sideOffset={4} style={{ width: 'var(--radix-popover-trigger-width)' }}>
          <Command>
            <CommandInput placeholder="Search options..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      handleSelect(option.value);
                    }}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                          selected.includes(option.value) ? 'border-primary bg-primary text-primary-foreground' : 'opacity-50 border-muted-foreground',
                        )}
                      >
                        {selected.includes(option.value) && <Check className="h-3 w-3 cursor-pointer text-gray-500" />}
                      </div>
                      <span className="text-[14px] text-gray-500 cursor-pointer">
                        {option.label} / {option.role}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {isSelectedItemShow && selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLabels.map((item) => (
            <Badge
              key={item.value}
              className={cn(
                'rounded-[4px] flex items-center gap-1 px-3 py-1',
                item.color, // assuming this is a Tailwind class or text color
              )}
              variant="outline"
            >
              {item.label} / {item.role}
              <button
                type="button"
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50"
                onClick={() => handleUnselect(item.value)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
