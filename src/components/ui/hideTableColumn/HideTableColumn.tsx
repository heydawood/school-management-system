import React from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

interface HideTableColumnProps {
  visibleColumns: Record<string, boolean>;
  onToggle: (key: string) => void;
}

const HideTableColumn: React.FC<HideTableColumnProps> = ({ visibleColumns, onToggle }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="text-gray-500 cursor-pointer h-[40px] w-[40px] bg-transparent hover:bg-transparent rounded-full flex items-center justify-center">
            <IoSettingsSharp size={24} />
          </MenubarTrigger>
          <MenubarContent
            align="end"
            className="z-[60] space-y-1 m-0 p-0 min-h-fit h-auto w-[195px] bg-white rounded-lg shadow border border-gray-200"

            // className='space-y-1 m-0 p-0 min-h-fit h-auto w-[195px] bg-white rounded-lg shadow border border-gray-200'
          >
            <div className="p-2">
              {Object.keys(visibleColumns).map((key) => (
                <label key={key} className="flex items-center gap-2 text-[14px] text-gray-500 cursor-pointer w-full h-[25px]">
                  <input type="checkbox" checked={visibleColumns[key]} onChange={() => onToggle(key)} />
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default HideTableColumn;
