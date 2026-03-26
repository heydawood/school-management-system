import React from 'react';
import { useFormContext, type RegisterOptions } from 'react-hook-form';

interface Props {
  type: string;
  name: string;
  id?: string;
  label: string;
  rules?: RegisterOptions;
  classNames?: string;
  value: string;
  // checked?: boolean
}

const RadioInput: React.FC<Props> = ({
  type,
  name,
  id,
  label,
  rules = {},
  classNames = '',
  value,
  // checked = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4 w-[100%]">
      <div className="mt-2 relative flex gap-3 items-center">
        <input
          id={id}
          {...register(name, rules)} // Register input with react-hook-form and validation rules
          type={type}
          value={value}
          // checked={checked}
          className={`${classNames}`}
        />

        <label htmlFor={id} className="block whitespace-nowrap text-[16px] font-medium leading-6 text-black">
          {label}
        </label>
      </div>
      {errors[name] && <span className="text-error-500 text-sm">{errors[name]?.message as string}</span>}
    </div>
  );
};

export default RadioInput;
