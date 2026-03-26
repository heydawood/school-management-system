'use client';

import React, { useState, type ReactNode } from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import clsx from 'clsx';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import RequiredAsterisk from '../requiredAsterisk';
import { Button } from '../button';
import Icon from '../svg_icon/SvgIcon';

type Props = {
  name: string;
  label?: string;
  data?: Array<Data>;
  value?: number | string;
  rules?: RegisterOptions;
  classNames?: string;
  contentWidth?: string;
  isSearchAble?: boolean;
  placeholder?: string;
  allowAsterisk?: boolean;
  disabled?: boolean;
  // isDefaultValue?: boolean
  onChange?: (val: string) => void;
  isAddItem?: boolean;
  onAddItem?: () => void;
  addItemText?: string;
  icon?: ReactNode;
};

type Data = {
  name: string;
  value: string | number;
  icon?: { name: any; color: string };
};

const Dropdown: React.FC<Props> = ({
  label,
  name,
  data,
  icon,
  value = null,
  rules = {},
  classNames = '',
  contentWidth = '',
  isSearchAble = false,
  placeholder = 'Select...',
  allowAsterisk = false,
  disabled = false,
  isAddItem = false,
  onAddItem,
  addItemText = 'Add Item',
  onChange,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredData = data?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <FormItem className="relative">
        {label && (
          <label htmlFor={name} className="block whitespace-nowrap text-sm font-medium leading-6 text-gray-900">
            {label}
            {allowAsterisk && <RequiredAsterisk />}
          </label>
        )}
        <FormControl>
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <Select
                disabled={disabled}
                key={field.value}
                value={field.value ?? ''}
                onValueChange={(newVal) => {
                  field.onChange(newVal);
                  onChange?.(newVal);
                  setOpen(false); // 👈 close dropdown after selection
                }}
                open={open}
                onOpenChange={setOpen}
              >
                <SelectTrigger
                  className={clsx(
                    'mt-[11px] w-full flex appearance-none rounded-xl border border-input-border h-[44px] px-3 text-sm',
                    'focus:border-primary ring-0 focus:ring-0  focus:outline-none outline-none data-[focus]:border-primary data-[active]:border-primary',
                    errors[name] ? '!border-error-500 border-2 !focus:border-error-500' : '',
                    classNames,
                  )}
                >
                  <div className="flex items-center gap-2">
                    {icon && <span>{icon}</span>}
                    <SelectValue placeholder={placeholder} />
                  </div>
                </SelectTrigger>
                <SelectContent className={`${contentWidth || 'w-full'}`}>
                  {isSearchAble && (
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  {filteredData?.length ? (
                    <>
                      {filteredData.map((item, index) => (
                        <SelectItem value={item.value as string} key={index} className="hover:bg-gray-200 rounded-lg cursor-pointer">
                          <div className="flex items-center">
                            {item.icon && (
                              <span style={{ color: item.icon.color }} className="mr-2">
                                {item.icon.name}
                              </span>
                            )}
                            <span>{item.name}</span>
                          </div>
                        </SelectItem>
                      ))}

                      {isAddItem && (
                        <Button
                          onClick={() => {
                            onAddItem?.();
                            setOpen(false); // 👈 close dropdown after adding
                          }}
                          variant="link"
                          className="ps-2"
                        >
                          {addItemText}
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="p-2 text-sm text-gray-500">No options found</div>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </FormControl>
        {errors[name] && (
          <FormMessage>
            <span className="text-error-500">{errors[name]?.message as string}</span>
          </FormMessage>
        )}
      </FormItem>
    </div>
  );
};

export default Dropdown;
