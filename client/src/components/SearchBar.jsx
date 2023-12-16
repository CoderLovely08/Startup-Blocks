import React from "react";

const SearchBar = () => {
  return (
    <div className="flex-grow max-w-4xl mx-2">
      <input
        className="w-full border border-cyan-400 rounded-md px-4 py-2 outline-none hover:shadow-md font-palanquin max-sm:px-2 max-sm:py-1"
        type={"text"}
        placeholder="Search for something"
      />
    </div>
  );
};

export default SearchBar;
