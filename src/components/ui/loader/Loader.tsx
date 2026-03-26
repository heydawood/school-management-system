import React from 'react';
import ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div
      role="status"
      aria-label="loading"
      className="fixed inset-0 z-40 flex justify-center items-center 
                 bg-black/80 backdrop-blur-sm"
    >
      <span className="relative flex size-8">
        <span className="absolute inline-flex h-full w-full duration-1000 animate-ping rounded-full bg-primary-200 opacity-75"></span>
        <span className="relative inline-flex size-8 rounded-full bg-primary-500"></span>
      </span>
    </div>,
    document.body,
  );
};

export default Loader;
