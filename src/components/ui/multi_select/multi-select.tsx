// 'use client'

// import React, { useState } from 'react'
// import { Controller, useFormContext, RegisterOptions } from 'react-hook-form'
// import clsx from 'clsx'
// import {
//   FormControl,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

// type Props = {
//   name: string
//   label?: string
//   data?: Array<Data>
//   rules?: RegisterOptions
//   classNames?: string
//   contentWidth?: string
//   isSearchAble?: boolean
//   onChange?: (values: Array<string | number>) => void
// }

// type Data = {
//   name: string
//   value: string | number
//   icon?: { name: any; color: string }
// }

// const MultiSelectOption: React.FC<Props> = ({
//   label,
//   name,
//   data,
//   rules = {},
//   classNames = '',
//   contentWidth = '',
//   isSearchAble = false,
//   onChange,
// }) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext()

//   // State for search query
//   const [searchQuery, setSearchQuery] = useState('')
//   // State for selected values
//   const [selectedValues, setSelectedValues] = useState<Array<string | number>>(
//     [],
//   )

//   // Filtered data based on search query
//   const filteredData = data?.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const handleValueChange = (value: string | number) => {
//     const updatedValues = selectedValues.includes(value)
//       ? selectedValues.filter((v) => v !== value) // Remove value if already selected
//       : [...selectedValues, value] // Add value if not selected

//     setSelectedValues(updatedValues)

//     // Call the custom onChange function if provided
//     if (onChange) {
//       onChange(updatedValues)
//     }
//   }

//   return (
//     <div className=''>
//       <FormItem className='relative'>
//         {label && (
//           <FormLabel className='text-sm font-semibold'>{label}</FormLabel>
//         )}
//         <FormControl>
//           <Controller
//             name={name}
//             control={control}
//             rules={rules}
//             defaultValue={[]}
//             render={({ field }) => (
//               <Select>
//                 <SelectTrigger
//                   className={clsx(
//                     'mt-2 w-full flex bg-input appearance-none rounded-xl border border-input-border py-6 px-3 text-sm',
//                     'focus:border-primary focus:outline-none outline-none data-[focus]:border-primary data-[active]:border-primary',
//                     classNames,
//                   )}
//                 >
//                   <SelectValue placeholder='Select' />
//                   {/* Show selected values */}
//                   <div className='ml-2 flex flex-wrap gap-1'>
//                     {selectedValues.map((val, index) => (
//                       <span
//                         key={index}
//                         className='bg-primary text-white px-2 py-1 rounded-md text-xs'
//                       >
//                         {data?.find((item) => item.value === val)?.name}
//                       </span>
//                     ))}
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent className={`${contentWidth}`}>
//                   {/* Search input */}
//                   {isSearchAble && (
//                     <div className='p-2'>
//                       <input
//                         type='text'
//                         placeholder='Search...'
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className={`w-full px-3 py-1 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
//                       />
//                     </div>
//                   )}

//                   {/* Dropdown items */}
//                   {filteredData?.length ? (
//                     filteredData.map((item, index) => (
//                       <SelectItem
//                         value={item.value as string}
//                         key={index}
//                         onClick={() => handleValueChange(item.value)}
//                         className={`hover:bg-gray-light ${
//                           selectedValues.includes(item.value)
//                             ? 'bg-primary text-white'
//                             : ''
//                         }`}
//                       >
//                         <div className='flex items-center'>
//                           {item.icon ? (
//                             <span
//                               style={{ color: item.icon.color }}
//                               className='mr-2'
//                             >
//                               {item.icon.name}
//                             </span>
//                           ) : null}
//                           <span>{item.name}</span>
//                         </div>
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className='p-2 text-sm text-gray-500'>
//                       No options found
//                     </div>
//                   )}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </FormControl>
//         {errors[name] && (
//           <FormMessage>
//             <span className='text-red-500'>
//               {errors[name]?.message as string}
//             </span>
//           </FormMessage>
//         )}
//       </FormItem>
//     </div>
//   )
// }

// export default MultiSelectOption

'use client'

import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import clsx from 'clsx'

type Props = {
  name: string
  label?: string
  data?: Array<Data>
  rules?: any
  classNames?: string
  isSearchAble?: boolean
  onChange?: (values: Array<string | number>) => void
}

type Data = {
  name: string
  value: string | number
  icon?: { name: any; color: string }
}

const MultiSelectOption: React.FC<Props> = ({
  label,
  name,
  data = [],
  rules = {},
  classNames = '',
  isSearchAble = false,
  onChange,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='w-full'>
      {label && <label className='font-semibold text-sm'>{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={[]}
        render={({ field }) => {
          const [search, setSearch] = useState('')

          const handleSelect = (value: string | number) => {
            const isSelected = field.value.includes(value)
            const updatedValues = isSelected
              ? field.value.filter((v: any) => v !== value)
              : [...field.value, value]

            field.onChange(updatedValues)
            onChange?.(updatedValues)
          }

          const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          )

          return (
            <div className='relative'>
              {/* Input field */}
              <div
                className={clsx(
                  'w-full border border-gray-300 rounded-md p-2 cursor-pointer',
                  classNames,
                )}
              >
                {field.value.length === 0 ? (
                  <span className='text-gray-400 text-sm'>Select...</span>
                ) : (
                  <div className='flex flex-wrap gap-1'>
                    {field.value.map((val: any, index: number) => {
                      const item = data.find((d) => d.value === val)
                      return (
                        <span
                          key={index}
                          className='bg-primary text-white px-2 py-1 rounded text-xs'
                        >
                          {item?.name}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Dropdown */}
              <div className='absolute z-10 w-full bg-white border mt-1 rounded max-h-60 overflow-y-auto shadow'>
                {isSearchAble && (
                  <input
                    className='w-full p-2 border-b outline-none text-sm'
                    type='text'
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                )}

                {filtered.length ? (
                  filtered.map((item, idx) => {
                    const selected = field.value.includes(item.value)
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelect(item.value)}
                        className={clsx(
                          'p-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center',
                          selected && 'bg-primary text-white',
                        )}
                      >
                        {item.icon && (
                          <span
                            style={{ color: item.icon.color }}
                            className='mr-2'
                          >
                            {item.icon.name}
                          </span>
                        )}
                        <span>{item.name}</span>
                      </div>
                    )
                  })
                ) : (
                  <div className='p-2 text-sm text-gray-500'>
                    No options found
                  </div>
                )}
              </div>

              {errors[name] && (
                <p className='text-sm text-red-500 mt-1'>
                  {errors[name]?.message as string}
                </p>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}

export default MultiSelectOption
