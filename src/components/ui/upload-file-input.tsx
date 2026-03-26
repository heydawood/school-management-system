'use client';
import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { LuUpload } from 'react-icons/lu';
import Spinner from '@/components/ui/spinner';
import NextImage from '@/components/ui/nextImage/NextImage';

interface FileUploaderProps {
  uploadType: 'image' | 'file';
  type: string;
  value?: { url: string | null; fullPath: string | null };
  onChange: (value: { url: string | null; fullPath: string | null }) => void;
  onDelete?: () => void;
  dispatch: any;
  uploadAction: any;
  resetAction: any;
  className?: string;
  imageClassName?: string;
}

const UploadFileInput: React.FC<FileUploaderProps> = ({
  uploadType,
  type,
  value,
  onChange,
  onDelete,
  dispatch,
  uploadAction,
  resetAction,
  className = 'w-[100px] h-[100px]',
  imageClassName = 'rounded-full',
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const res = await dispatch(
        uploadAction({
          file,
          type,
          uploadType,
        }),
      ).unwrap();

      onChange({
        url: res.url,
        fullPath: res.fullUrl,
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    onChange({ url: null, fullPath: null });
    dispatch(resetAction());
    onDelete?.();
  };

  return (
    <>
      {loading ? (
        <div
          className={`cursor-pointer flex flex-col items-center justify-center rounded bg-gray-25 border border-dashed border-gray-500 text-gray-500 text-[12px] font-medium gap-1 ${className}`}
        >
          <Spinner />
        </div>
      ) : value?.fullPath ? (
        <div className={`relative ${className}`}>
          <NextImage image={value.fullPath} width={100} height={100} classNames={`w-full h-full object-cover ${imageClassName}`} />
          <div className="absolute top-2 right-2 flex items-center justify-center cursor-pointer w-[24px] h-[24px] rounded-full bg-error-50 text-error-500" onClick={handleDelete}>
            <HiOutlineTrash className="text-lg" />
          </div>
        </div>
      ) : (
        <>
          <label htmlFor="upload-image">
            <div
              className={`cursor-pointer flex flex-col items-center justify-center rounded bg-gray-25 border border-dashed border-gray-500 text-gray-500 text-[12px] font-medium gap-1 ${className}`}
            >
              <LuUpload className="text-[16px]" />
              <span>Upload {uploadType === 'image' ? 'Image' : 'File'}</span>
            </div>
          </label>
          <input id="upload-image" type="file" onChange={handleUpload} className="hidden" />
        </>
      )}
    </>
  );
};

export default UploadFileInput;
