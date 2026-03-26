import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="w-12 h-12 border-4 border-t-4 border-t-primary border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
