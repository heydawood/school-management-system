import React, { useEffect, useState } from 'react';

interface MultiTagsProps {
  placeholder?: string;
  className?: string;
  value?: string[];
  onTagsChange?: (tags: string[]) => void;
}

const MultiTags: React.FC<MultiTagsProps> = ({ placeholder = 'Enter Tags', className = '', value, onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setInputValue('');
        if (onTagsChange) {
          onTagsChange(newTags);
        }
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    if (onTagsChange) {
      onTagsChange(updatedTags);
    }
  };

  useEffect(() => {
    if (value) {
      setTags(value);
    }
  }, [value]);

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex flex-wrap items-center border border-input-border shadow-sm placeholder:text-gray-400 px-[12px] rounded-[8px] bg-white sm:text-sm sm:leading-6 ${
          tags && tags.length > 0 ? 'py-2' : 'py-0'
        } focus-within:border-primary focus-within:ring-primary`}
      >
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => (
            <div key={index} className="mt-1 flex items-center bg-primary text-black p-1 rounded-[4px] text-[14px] font-normal mr-2">
              {tag}
              <button type="button" className="ml-2 text-black hover:text-red-500" onClick={() => handleRemoveTag(tag)}>
                ✕
              </button>
            </div>
          ))}

        <input
          type="text"
          className={`placeholder:text-gray-400 flex-1 bg-transparent outline-none text-sm ${tags && tags.length > 0 ? 'h-auto' : 'h-[44px]'}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>
    </div>
  );
};

export default MultiTags;
