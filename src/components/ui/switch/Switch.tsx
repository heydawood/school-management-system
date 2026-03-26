// Switcher.js

import React, { useState } from 'react';
type Props = {
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
  className?: string;
  label: string;
  labelPosition: 'left' | 'right';
};

const Switcher: React.FC<Props> = ({ isChecked, onToggle, className, label, labelPosition }) => {
  const handleCheckboxChange = () => {
    if (!onToggle) return;
    onToggle(!isChecked);
  };

  return (
    <label className={`flex cursor-pointer select-none items-center whitespace-nowrap text-sm font-medium leading-6 ${className}`}>
      {labelPosition === 'left' && <span className="mr-2 text-paragraph">{label}</span>}
      <div className="relative">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="sr-only" />
        <div className={`box block h-5 w-10 rounded-full ${isChecked ? 'bg-primary' : 'bg-neutral-975'}`}></div>
        <div className={`absolute left-1 top-1 flex h-3 w-4 items-center justify-center rounded-full bg-white transition ${isChecked ? 'translate-x-full' : ''}`}></div>
      </div>
      {labelPosition === 'right' && <span className="ml-2 text-paragraph">{label}</span>}
    </label>
  );
};

export default Switcher;
