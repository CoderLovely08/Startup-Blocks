import React from "react";

const Button = ({ label, variant }) => {
  return (
    <>
      {variant == "contained" ? (
        <button className="border border-cyan-500 font-bold rounded-md text-lg font-palanquin px-4 py-2 mx-1 text-white bg-cyan-500 hover:text-cyan-500 hover:bg-white max-sm:text-sm max-sm:px-2 max-sm:py-1">
          {label}
        </button>
      ) : (
        <button className="border border-cyan-500 font-bold rounded-md text-lg text-cyan-500 font-palanquin px-4 py-2 mx-1 hover:text-white hover:bg-cyan-500 max-sm:text-sm max-sm:px-2 max-sm:py-1">
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
