'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  classNames?: string;
  onChange?: (checked: boolean | string) => void;
};

const Checkbox: React.FC<Props> = ({ name, label, rules = {}, classNames, onChange }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormItem>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          // normalize incoming value (can be boolean or string)
          const value = field.value === true || field.value === 'true' ? true : field.value === false || field.value === 'false' ? false : false;
          return (
            <div className="flex gap-2 items-center">
              <CheckboxPrimitive.Root
                id={name}
                checked={value}
                onCheckedChange={(checked) => {
                  const finalValue = typeof field.value === 'string' ? (checked ? 'true' : 'false') : !!checked;

                  field.onChange(finalValue);
                  if (onChange) onChange(finalValue);
                }}
                className={cn(
                  'peer h-4 w-4 shrink-0 rounded-md border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
                  classNames,
                )}
              >
                <CheckboxPrimitive.Indicator className="flex text-white items-center justify-center text-current">
                  <CheckIcon className="h-4 w-4" />
                </CheckboxPrimitive.Indicator>
              </CheckboxPrimitive.Root>

              <label className="block whitespace-nowrap font-semibold select-none text-paragraph leading-6 text-gray-900" htmlFor={name}>
                {label}
              </label>
            </div>
          );
        }}
      />

      {errors[name] && (
        <FormMessage>
          <span className="text-red-500 text-paragraph">{errors[name]?.message as string}</span>
        </FormMessage>
      )}
    </FormItem>
  );
};

export default Checkbox;
