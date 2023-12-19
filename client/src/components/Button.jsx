import React from "react";

const Button = ({ label, variant, onClick }) => {
  const contained = "text-white bg-cyan-500 hover:text-cyan-500 hover:bg-white";
  const outlined = "text-cyan-500 bg-white hover:text-white hover:bg-cyan-500";
  return (
    <>
      <button
        onClick={onClick}
        className={`border border-cyan-500 font-bold rounded-md text-lg font-palanquin px-4 py-2 mx-1 ${
          variant == "outlined" ? outlined : contained
        } max-sm:text-sm max-sm:px-2 max-sm:py-1`}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
