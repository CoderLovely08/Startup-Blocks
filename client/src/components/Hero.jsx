import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <h3 className="text-4xl font-bold w-1/2 text-center flex-wrap max-sm:text-2xl max-md:text-3xl max-md:w-full px-4">
        🚀 Discover{" "}
        <span className="text-cyan-500 underline">Money-Making</span> Startups
        And Side-Projects.
      </h3>
      <p className="max-md:text-sm text-xl w-1/2 py-4 leading-normal font-montserrat font-semibold text-center max-md:w-full px-4">
        Sign-up for our free weekly newsletter & learn how founders are building
        profitable projects and making money online 💸
      </p>
    </div>
  );
};

export default Hero;
