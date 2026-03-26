import React from 'react';
import { useFormContext, type RegisterOptions } from 'react-hook-form';

interface props {
  label: string;
  name: string;
  rules?: RegisterOptions;
}

const DatePickerComponent = ({ label, name, rules = {} }: props) => {
  const today = new Date().toISOString().split('T')[0];
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="">
        <label htmlFor="date" className="block whitespace-nowrap text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 end-3 flex items-center ps-3.5 cursor-pointer pointer-events-none">
            <svg
              className="w-5 h-5 text-gray bg-white cursor-pointer dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            {...register(name, rules)}
            type="date"
            id={name}
            className="bg-white border border-gray-light shadow-sm px-3 py-3 focus:border-primary focus:outline-primary  text-gray text-sm rounded-lg   w-full mt-2"
            required
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
            }}
          />
        </div>
        {errors[name] && <span className="text-red-500 text-sm">{errors[name]?.message as string}</span>}
      </div>
    </>
  );
};

export default DatePickerComponent;
