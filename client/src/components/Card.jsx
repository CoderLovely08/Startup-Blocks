import { ArrowRightIcon, MegaphoneIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Card = ({ startupInfo, handleClick }) => {
  const { startup_name, startup_funding, startup_date, startup_city } =
    startupInfo;
  return (
    <div className="flex flex-col rounded-2xl border w-64 gap-4 shadow-lg m-2 hover:shadow-xl transition bg-white hover:ring-cyan-500 hover:ring-1">
      <div>
        <div className="flex items-center mt-2 gap-2 px-2">
          <MegaphoneIcon className="text-white bg-cyan-500 w-10 rounded-full p-2 inline-block" />
          <h3 className="font-palanquin text-2xl font-bold text-center">
            {startup_name}
          </h3>
        </div>
        <p className="text-md text-center text-slate-gray font-palanquin font-bold rounded-md leading-normal">
          Funding - {startup_funding}💸
        </p>
      </div>

      <div className="flex justify-center" onClick={handleClick}>
        <Button label={"View"} variant={"outlined"} />
      </div>

      <div className="flex justify-between gap-2 m-2">
        <span className="text-white shadow-md rounded-full px-2 py-1 bg-cyan-500 font-bold text-[14px]">
          📅{new Date(startup_date).getFullYear()}
        </span>
        <span className="text-white shadow-md rounded-full px-2 py-1 bg-cyan-500 font-bold text-[14px]">
          📍{startup_city}
        </span>
      </div>
    </div>
  );
};

export default Card;
