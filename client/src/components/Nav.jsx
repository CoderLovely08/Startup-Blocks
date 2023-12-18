import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SearchBar from "./SearchBar";

const Nav = () => {
  return (
    <header className="px-2 py-2 sticky top-0 z-50 w-full shadow-md bg-white-400 max-sm:h-20">
      <nav className="flex flex-1 justify-between items-center max-container">
        {/* Logo */}

        <Link to={"/"}>
          <p className="font-bold text-xl bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-white border-cyan-500 border hover:text-cyan-500 max-sm:text-sm max-sm:py-1 max-sm:px-2">
            Startup Blocks
          </p>
        </Link>

        <div className="flex flex-grow justify-center max-sm:absolute bottom-0 left-0 max-sm:w-screen px-2 mb-1">
          <SearchBar />
        </div>
        <div className="flex">
          <Link to={"/login"}>
            <Button label={"Login"} />
          </Link>
          <Link to={"/register"}>
            <Button label={"Signup"} variant="contained" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
