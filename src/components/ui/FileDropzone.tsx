import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const FileDropzone: React.FC<{ title?: string; filePath?: string; fileType: 'Video' | 'Image' }> = ({
  title = 'Drag or upload exercise animation here.',
  filePath = null,
  fileType,
}) => {
  return (
    <div className="w-full mb-4 flex justify-center mx-auto cursor-pointer">
      <div className="relative w-full h-[160px] rounded-[8px] overflow-hidden border border-dashed border-neutral-975 bg-neutral-200">
        {filePath ? (
          fileType === 'Image' ? (
            <Avatar className="w-full h-full rounded-none">
              <AvatarImage
                src={filePath}
                className="w-full h-full object-cover object-center"
                onLoadingStatusChange={(status) => {
                  const fallback = document.getElementById('cover-fallback');
                  if (fallback) fallback.style.display = status === 'loaded' ? 'none' : 'flex';
                }}
              />
              <AvatarFallback id="cover-fallback" className="w-full h-full flex items-center justify-center bg-transparent">
                <div className="w-6 h-6 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <video id="myVideo" className="w-full h-full object-cover object-center">
              <source src={filePath} type="video/mp4" />
              <source src={filePath} type="video/ogg" />
              Your browser does not support HTML5 video.
            </video>
          )
        ) : (
          <div className="text-center h-full flex flex-col justify-center items-center p-10 absolute inset-0">
            <img src="/images/uploader.png" alt="upload icon" width={50} height={50} />
            <div className="flex flex-col">
              <h3 className="pt-2 text-paragraph font-semibold">{title ?? null}</h3>
              <p className="text-paragraph text-gray-25">File size max: 10MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
