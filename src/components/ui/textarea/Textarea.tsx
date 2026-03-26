'use client';

import React from 'react';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea as ShadTextarea } from '@/components/ui/textarea';

type Props = {
  placeholder: string;
  name: string;
  label: string;
  rows: string;
  cols?: string;
  rules?: RegisterOptions;
  className?: string;
};

const Textarea: React.FC<Props> = ({ placeholder, name, label, rows, cols, className, rules = {} }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormItem>
      <FormLabel htmlFor={name} className="block whitespace-nowrap font-semibold text-sm leading-6 text-gray-900">
        {label}
      </FormLabel>
      <FormControl>
        <ShadTextarea id={name} {...register(name, rules)} rows={+rows} placeholder={placeholder} className={`bg-white rounded-[8px] border-input-border ${className}`} />
      </FormControl>
      {errors[name] && (
        <FormMessage>
          <span className="text-red-500 text-sm">{errors[name]?.message as string}</span>
        </FormMessage>
      )}
    </FormItem>
  );
};

export default Textarea;
