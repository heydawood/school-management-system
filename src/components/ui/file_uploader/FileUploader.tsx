import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface FileUploaderProps {
  children: React.ReactNode; // Button content
  onFilesSelected: (files: FileList) => void; // Callback when files are selected
  multiple?: boolean; // Allow multiple file selection
  accept?: string; // Accept specific file types (e.g., "image/*")
  refProp?: React.RefObject<HTMLInputElement>; // Optional external ref
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ children, onFilesSelected, multiple = false, accept = '*', refProp, className = '' }) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = refProp || internalRef;

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesSelected(event.target.files);
      // reset input so same file can be re-uploaded
      event.target.value = '';
    }
  };

  return (
    <>
      <div onClick={handleButtonClick} className={cn('cursor-pointer', className)}>
        {children}
      </div>
      <input type="file" ref={inputRef} style={{ display: 'none' }} multiple={multiple} accept={accept} onChange={handleFileChange} />
    </>
  );
};

export default FileUploader;
