import { EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStartups } from "../context/StartupContext";
import { BASE_STARTUP_URL } from "../service";

const SearchBar = () => {
  const { state, dispatch } = useStartups();
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    setOriginalData(state.startupItems);
  }, [state.startupItems]);

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    if (state.searchQuery.trim() === "") {
      // Reset the startupItems array to the originalData when a new search is performed
      dispatch({ type: "SET_STARTUP_ITEMS", payload: originalData });
    } else {
      const response = await axios.get(
        `${BASE_STARTUP_URL}/startups?search=${state.searchQuery}`
      );
      console.log(state.startupItems);
      dispatch({ type: "SET_STARTUP_ITEMS", payload: response.data.data });
    }

    dispatch({ type: "SET_LOADING", payload: false });
  };

  return (
    <div className="flex-grow max-w-4xl relative">
      <form className="flex-grow max-w-4xl relative" onSubmit={handleSearch}>
        <input
          className="w-full border ring-cyan-500 border-cyan-400 rounded-md px-4 py-2 outline-none hover:shadow-md font-palanquin max-sm:px-2 max-sm:py-1"
          type={"text"}
          placeholder="Search for something"
          value={state.searchQuery}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
          }
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
