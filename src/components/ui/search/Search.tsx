'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import Input from '../ui/input/input'
import { CiSearch } from 'react-icons/ci'
import Input from '../input/input'

// Define the props type
interface SearchInputProps {
  classes?: string
  placeholder?: string
}

const Search: React.FC<SearchInputProps> = ({
  classes,
  placeholder = 'Search',
}) => {
  const searchForm = useForm()

  return (
    <div className={`grow`}>
      <FormProvider {...searchForm}>
        <form>
          <Input
            icon={<CiSearch className='text-dark' size={20} />}
            iconPosition='left'
            type='text'
            label=''
            name='search'
            placeholder={placeholder}
            classNames={`${classes} border border-gray h-10 bg-transparent w-[239px] rounded-[8px] text-white`}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default Search
