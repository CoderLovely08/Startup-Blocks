import React, { createContext, useContext, useReducer } from "react";

const StartupContext = createContext();

export const StartupProvider = ({ children }) => {
  const initialState = {
    startupItems: [],
    loading: false,
    searchQuery: "",
    currentPage: 1,
    filterValue: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_STARTUP_ITEMS":
        return {
          ...state,
          startupItems: [...action.payload],
        };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_SEARCH_QUERY":
        return {
          ...state,
          searchQuery: action.payload,
          currentPage: 1,
        };
      case "SET_CURRENT_PAGE":
        return { ...state, currentPage: action.payload };

      case "SET_CURRENT_FILTER":
        return { ...state, filterValue: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StartupContext.Provider value={{ state, dispatch }}>
      {children}
    </StartupContext.Provider>
  );
};

export const useStartups = () => {
  return useContext(StartupContext);
};
