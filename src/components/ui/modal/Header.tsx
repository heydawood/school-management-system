import React, { type ReactNode } from 'react';
import { Button } from '../button';
import { CrossIcon } from '@/Utils/Icons';
interface props {
  children: React.ReactElement;
  allowLogo?: boolean;
  contentLocation?: 'left' | 'center' | 'right';
  className?: string;
  showCloseButton?: boolean;
  onCloseClick?: () => void;
  customLogo?: ReactNode;
  logoClasses?: string;
}
const Modalheader = ({ children, allowLogo = true, customLogo, contentLocation = 'center', className = '', logoClasses, showCloseButton = false, onCloseClick }: props) => {
  return (
    <div className={`flex items-start justify-${contentLocation} relative p-1 ${allowLogo ? '' : 'py-4'} border-b border-solid border-gray-light relative rounded-t ${className}`}>
      {showCloseButton && (
        <Button variant="ghost" size={'icon'} type="button" className="absolute shadow-md rounded-xl border border-theme-border top-4 right-4" onClick={onCloseClick}>
          <CrossIcon className="w-4 h-4" />{' '}
        </Button>
      )}
      <div className="flex gap-x-2 items-center justify-center">
        {allowLogo &&
          (customLogo ? (
            <div className={`h-12 w-12 flex justify-center items-center rounded-xl ${logoClasses}`}>{customLogo}</div>
          ) : (
            <img src="/images/logo-dark.png" alt="image" width={45} height={45} />
          ))}
        {children}
      </div>
    </div>
  );
};

export default Modalheader;
