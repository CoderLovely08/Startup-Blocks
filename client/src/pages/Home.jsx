import React, { useState } from "react";
import Card from "../components/Card";
import Hero from "../components/Hero";
import Modal from "../components/Modal";

const Home = () => {
  const [selectedStartup, setSelectedStartup] = useState(true);

  const startups = [
    {
      startupName: "Startup 1",
      industryVertical: "Tech",
      subVertical: "AI",
      city: "San Francisco",
      funding: 1000000,
      remarks: "Innovative AI solutions.",
    },
    // Add more startup objects as needed
  ];

  const handleStartupClick = (startup) => {
    setSelectedStartup(startup);
  };

  const handleCloseModal = () => {
    setSelectedStartup(null);
  };

  const items = [
    { title: "Cred", funding: 1234567, date: new Date(), city: "Nagpur" },
  ];
  return (
    <main className="relative flex flex-col items-center max-md:px-4">
      {/* Hero Section */}
      <Hero />
      {/* Cards Section */}
      <section className="w-2/3 bg-white border rounded-md flex flex-wrap justify-center max-md:w-full">
        {items.map((item) => (
          <Card
            key={item.title}
            startupInfo={item}
            handleClick={() => handleStartupClick(item)}
          />
        ))}
      </section>
      {/* Render the Modal */}
      {selectedStartup && (
        <Modal startupInfo={selectedStartup} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default Home;
