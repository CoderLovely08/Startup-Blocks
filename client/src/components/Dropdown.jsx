import React from "react";
import { useStartups } from "../context/StartupContext";

const Dropdown = ({ options, title }) => {
  const { dispatch } = useStartups();

  return (
    <select
      className="bg-slate-100 px-2 py-1 shadow-md border rounded-md"
      onChange={(e) => {
        dispatch({
          type: "SET_CURRENT_FILTER",
          payload: e.target.value != "All" ? e.target.value : "",
        });
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      }}
      defaultValue={title}
    >
      <option disabled hidden>
        {title}
      </option>
      {options.map((option) => (
        <option key={option.startup_investment_type}>
          {option.startup_investment_type}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
