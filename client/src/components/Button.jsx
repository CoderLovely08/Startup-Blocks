import React from "react";

const Button = ({ label }) => {
  return (
    <button className="border border-cyan-500 font-bold rounded-md text-lg text-cyan-500 font-palanquin px-4 py-2 mx-2 hover:text-white hover:bg-cyan-500 max-sm:text-sm max-sm:px-2 max-sm:py-1">
      {label}
    </button>
  );
};

export default Button;
