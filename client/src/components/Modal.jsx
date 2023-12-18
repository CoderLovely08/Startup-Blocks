import React from "react";

const Modal = ({ startupInfo, onClose }) => {
  const {
    startup_name,
    startup_industry_vertical,
    startup_sub_vertical,
    startup_city,
    startup_investor_name,
    startup_investment_type,
    startup_funding,
    startup_date,
    startup_remarks,
  } = startupInfo;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="bg-white w-96 max-md:w-2/3 max-sm:w-full rounded-md p-6 font-palanquin">
        <div className="mb-4">
          <h2 className="text-2xl font-bold  underline text-cyan-500">
            {startup_name}
          </h2>
          <p className="text-gray-500">{startup_industry_vertical}</p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Subvertical:</span>{" "}
            {startup_sub_vertical}
          </p>
          <p>
            <span className="font-bold">City:</span>{" "}
            <span className="bg-cyan-500 rounded-full px-2 text-white font-semibold py-0">
              {startup_city}
            </span>
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Funding:</span>{" "}
            <span className="bg-green-400 px-2 mx-2 rounded-md font-bold text-green-900 ring ring-green-700">
              {startup_funding}💸
            </span>
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Investor:</span> {startup_investor_name}
          </p>
          <p>
            <span className="font-bold">Type</span> {startup_investment_type}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Remarks:</span> {startup_remarks}
          </p>
        </div>
        <div className="flex flex-row-reverse">
          <button
            className="mt-4 p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
