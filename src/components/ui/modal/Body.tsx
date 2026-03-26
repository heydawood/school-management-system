import { cn } from '@/lib/utils';
import React from 'react';
interface props {
  children: React.ReactElement;
  fixedHeight?: boolean;
  className?: string;
}
const Modalbody = ({ children, className, fixedHeight = false }: props) => {
  return (
    <div className={cn(`relative px-6 py-2 flex-auto ${fixedHeight && 'min-h-[70vh]'} max-h-[70vh] overflow-y-auto scrollbar-thin`, className)}>
      <div className="my-4 text-blueGray-500 text-lg leading-relaxed">{children}</div>
    </div>
  );
};

export default Modalbody;
