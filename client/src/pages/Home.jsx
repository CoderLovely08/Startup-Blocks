import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Hero from "../components/Hero";
import Modal from "../components/Modal";

const Home = () => {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [startupList, setStartupList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/startup/startups"
        );
        console.log(response.data.data);
        setStartupList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this effect runs once when the component mounts

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
        {startupList.map((item) => (
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
