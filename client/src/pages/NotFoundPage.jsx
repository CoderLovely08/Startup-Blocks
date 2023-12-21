import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 border bg-white rounded-md">
        <span className="text-8xl text-cyan-500 font-bold mb-4">404</span>
        <p className="text-2xl mb-4">Page Not Found</p>
        <p className="text-lg">
          The page you are looking for might be under construction or does not
          exist.
        </p>
        <p className="mt-8">
          <Link to={"/"}>
            <Button label={"Return to Home"} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
