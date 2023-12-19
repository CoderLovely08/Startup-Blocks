import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-cyan-500 rounded-full dark:text-cyan-500"
      role="status"
      aria-label="loading"
    ></div>
  );
};

export default LoadingSpinner;
