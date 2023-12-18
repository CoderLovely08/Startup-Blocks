import { EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="flex-grow max-w-4xl relative">
      <input
        className="w-full border ring-cyan-500 border-cyan-400 rounded-md px-4 py-2 outline-none hover:shadow-md font-palanquin max-sm:px-2 max-sm:py-1"
        type={"text"}
        placeholder="Search for something"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
};

export default SearchBar;
