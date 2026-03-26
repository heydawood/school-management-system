import React from 'react';
import { useFormContext, type RegisterOptions } from 'react-hook-form';

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+1', country: 'Canada' },
  { code: '+7', country: 'Russia' },
  { code: '+20', country: 'Egypt' },
  { code: '+30', country: 'Greece' },
  { code: '+31', country: 'Netherlands' },
  { code: '+32', country: 'Belgium' },
  { code: '+33', country: 'France' },
  { code: '+34', country: 'Spain' },
  { code: '+36', country: 'Hungary' },
  { code: '+39', country: 'Italy' },
  { code: '+40', country: 'Romania' },
  { code: '+41', country: 'Switzerland' },
  { code: '+42', country: 'Czech Republic' },
  { code: '+43', country: 'Austria' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+45', country: 'Denmark' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+48', country: 'Poland' },
  { code: '+49', country: 'Germany' },
  { code: '+51', country: 'Peru' },
  { code: '+52', country: 'Mexico' },
  { code: '+53', country: 'Cuba' },
  { code: '+54', country: 'Argentina' },
  { code: '+55', country: 'Brazil' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+58', country: 'Venezuela' },
  { code: '+60', country: 'Malaysia' },
  { code: '+61', country: 'Australia' },
  { code: '+62', country: 'Indonesia' },
  { code: '+63', country: 'Philippines' },
  { code: '+64', country: 'New Zealand' },
  { code: '+65', country: 'Singapore' },
  { code: '+66', country: 'Thailand' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+84', country: 'Vietnam' },
  { code: '+86', country: 'China' },
  { code: '+90', country: 'Turkey' },
  { code: '+91', country: 'India' },
  { code: '+92', country: 'Pakistan' },
  { code: '+93', country: 'Afghanistan' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+95', country: 'Myanmar' },
  { code: '+98', country: 'Iran' },
];

interface PhoneNumberProps {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  rules?: RegisterOptions;
  classNames?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberProps> = ({ type, placeholder, name, label, icon, iconPosition = 'left', rules = {}, classNames = '' }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-3 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative flex items-center">
        {/* Country Code Dropdown inside Input */}
        <select
          {...register(`${name}.countryCode`, rules)}
          defaultValue="+1"
          className="block py-3 px-3 rounded-l-lg bg-input border border-input-border shadow-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:outline-none sm:text-sm sm:leading-6 w-24"
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code}
            </option>
          ))}
        </select>

        {/* Phone Number Input */}
        <input
          id={name}
          min="1"
          {...register(name, rules)}
          type={type}
          placeholder={placeholder}
          className={`block w-full py-3 px-3 rounded-r-lg bg-input border border-input-border shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none sm:text-sm sm:leading-6 ${
            iconPosition === 'left' ? 'pl-12' : ''
          } ${iconPosition === 'right' ? 'pr-12' : ''} ${classNames}`}
        />
        {icon && <div className={`absolute inset-y-0 flex items-center ${iconPosition === 'left' ? 'left-3' : 'right-3'}`}>{icon}</div>}
      </div>
      {errors[name] && <span className="text-red-500 text-sm">{errors[name]?.message as string}</span>}
    </div>
  );
};

export default PhoneNumberInput;

// const PhoneNumberInput: React.FC<PhoneNumberProps> = ({
//   type,
//   placeholder,
//   name,
//   label,
//   icon,
//   iconPosition = 'left',
//   rules = {},
//   classNames = '',
// }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext()

//   return (
//     <div className='mb-3 w-[100%]'>
//       <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
//         {label}
//       </label>
//       <div className='mt-2 relative flex items-center'>
//         {/* Country Code Input */}
//         <select
//           {...register(`${name}.countryCode`, rules)}
//           defaultValue={'+1'}
//           className='block py-3 px-3 rounded-l-lg bg-input border border-input-border shadow-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:outline-none sm:text-sm sm:leading-6 w-24'
//         >
//           {countryCodes.map((country) => (
//             <option key={country.code} value={country.code}>
//               {country.code}
//             </option>
//           ))}
//         </select>
//         {/* Phone Number Input */}
//         <input
//           type={type}
//           placeholder={placeholder}
//           {...register(`${name}.phoneNumber`, rules)}
//           className={`${iconPosition === 'left' ? 'pl-10' : ''} block py-3 px-3 rounded-r-lg bg-input border border-input-border shadow-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:outline-none sm:text-sm sm:leading-6 w-full`}
//         />
//         {icon && iconPosition === 'left' && (
//           <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
//             {icon}
//           </div>
//         )}
//         {icon && iconPosition === 'right' && (
//           <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
//             {icon}
//           </div>
//         )}
//       </div>
//       {errors[name] && (
//         <span className='text-red-500 text-sm'>
//           {errors[name]?.message as string}
//         </span>
//       )}
//     </div>
//   )
// }

// export default PhoneNumberInput
