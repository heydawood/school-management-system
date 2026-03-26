import React from 'react';
import { type RegisterOptions, useFormContext } from 'react-hook-form';

interface props {
  label: string;
  name: string;
  rules?: RegisterOptions;
}

const TimePickerComponent = ({ label, name, rules = {} }: props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="">
        <label htmlFor="time" className="block whitespace-nowrap font-semibold text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg className="w-6 h-6 text-gray bg-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            {...register(name, rules)}
            type="time"
            id={name}
            className="bg-white border border-gray-light shadow-sm px-3 py-3 focus:border-primary focus:ring-2 focus:ring-primary  text-gray text-sm rounded-lg mt-2  w-full "
            min="09:00"
            max="18:00"
            required
          />
        </div>
        {errors[name] && <span className="text-red-500 text-sm">{errors[name]?.message as string}</span>}
      </div>
    </>
  );
};

export default TimePickerComponent;
