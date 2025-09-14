import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 dark:border-purple-800"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-purple-600 dark:border-t-purple-400 absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default Spinner;
