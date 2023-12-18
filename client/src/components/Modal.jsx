import React from "react";

const Modal = ({ startupInfo, onClose }) => {
  const { startupName, industryVertical, subVertical, city, funding, remarks } =
    startupInfo;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="bg-white w-96 max-md:w-2/3 max-sm:w-full rounded-md p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold  underline text-cyan-500">
            #startupName
          </h2>
          <p className="text-gray-500">industryVertical</p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Subvertical:</span> subVertical
          </p>
          <p>
            <span className="font-bold">City:</span> city
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Funding:</span> $funding
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Remarks:</span> remarks
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
