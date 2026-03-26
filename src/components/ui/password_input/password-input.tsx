import React, { useState } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { FiEye } from 'react-icons/fi';
import SVG from 'react-inlinesvg';
import RequiredAsterisk from '../requiredAsterisk';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  rules?: RegisterOptions;
  classNames?: string;
  onChange?: (e: any) => void;
  minDate?: boolean | Date;
  maxDate?: string;
  allowAsterisk?: boolean;
}

const PasswordInput: React.FC<Props> = ({ type, placeholder, name, label, icon, iconPosition = null, rules = {}, classNames = '', onChange, minDate, maxDate, allowAsterisk }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getFormattedDate = (d: any) => {
    const date = d ? new Date(d) : new Date();

    date.setHours(0, 0, 0, 0);
    const isoString = date.toISOString();
    const formattedDate = isoString.slice(0, 19);
    return formattedDate;
  };

  const minFormattedDate = minDate ? getFormattedDate(minDate === true ? new Date() : minDate) : undefined;
  const maxFormattedDate = maxDate ? getFormattedDate(maxDate) : undefined;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-3 w-[100%]">
      <label htmlFor={name} className="block whitespace-nowrap text-sm font-medium leading-6 text-gray-900">
        {label}
        {allowAsterisk && (
          <span>
            <RequiredAsterisk />
          </span>
        )}
      </label>
      <div className="mt-2 relative">
        <input
          id={name}
          {...register(name, rules)}
          type={showPassword && type === 'password' ? 'text' : type}
          placeholder={placeholder}
          className={`block w-full py-[10px] px-4 rounded-[12px] bg-white border-2 border-grayLight-975 placeholder:text-gray-25 hover:border-primary/20 focus:border-primary-200 focus:outline-none sm:text-sm sm:leading-6 ${
            errors[name] ? '!border-error-500 !focus:border-error-500' : ''
          }
          ${iconPosition === 'left' ? 'pl-12' : ''} ${iconPosition === 'right' ? 'pr-12' : ''} ${classNames}`}
          // onChange={onChange}
          min={minDate ? minFormattedDate : undefined}
          max={maxDate ? maxFormattedDate : undefined}
        />
        {icon && <div className={`absolute inset-y-0 flex text-muted items-center ${iconPosition === 'left' ? 'left-3' : 'right-3'}`}>{icon}</div>}
        {/* Eye icon for password visibility toggle */}
        {type === 'password' && (
          <div onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 text-gray-400 flex items-center cursor-pointer">
            {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
            {showPassword ? <SVG src="/icons/eye.svg" className="w-5 h-5" /> : <SVG src="/icons/eye-slash.svg" className="w-5 h-5" />}
          </div>
        )}
      </div>
      {errors[name] && <span className="text-error-500 text-sm">{errors[name]?.message as string}</span>}
    </div>
  );
};

export default PasswordInput;
