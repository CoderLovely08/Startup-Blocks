import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const PageLoading = () => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 z-[100]">
      <LoadingSpinner />
    </div>
  );
};

export default PageLoading;
