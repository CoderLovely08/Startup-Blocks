import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Hero from "../components/Hero";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import { useStartups } from "../context/StartupContext";
import { BASE_STARTUP_URL } from "../service";

const Home = () => {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);

  const { state, dispatch } = useStartups();
  const { startupItems, loading, searchQuery, currentPage, filterValue } =
    state;

  // To populate dropdown
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchTypes = async () => {
      const filterOptionsData = await axios.get(
        `${BASE_STARTUP_URL}/investments`
      );

      setFilterOptions((prev) =>
        filterOptionsData.data.data.filter(
          (item) => item.startup_investment_type.length > 0
        )
      );
    };
    fetchTypes();
  }, []);

  // To populate cards
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const startupData = await axios.get(
          `${BASE_STARTUP_URL}/startups?search=${searchQuery}&page=${currentPage}&filter=${filterValue}`
        );

        dispatch({
          type: "SET_STARTUP_ITEMS",
          payload: startupData.data.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData(); // Call the async function
  }, [currentPage, searchQuery, filterValue]);

  // Handle card open click
  const handleStartupClick = (startup) => {
    setSelectedStartup(startup);
  };

  // handle click for modal closing
  const handleCloseModal = () => {
    setSelectedStartup(null);
  };

  // Handle click for loading more cards
  const handleLoadMore = () => {
    if (!loading) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage + 1 });
    }
  };

  return (
    <main className="relative flex flex-col items-center max-md:px-4 bg-slate-100 min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* Cards Section */}
      <div className="flex w-2/3 max-sm:w-full items-center justify-between mx-2 my-2">
        <div>
          <span className="font-bold text-xl max-sm:text-sm">Filters: </span>
          <Dropdown
            title={"Investment Type"}
            options={[{ startup_investment_type: "All" }, ...filterOptions]}
          />
        </div>
        <Link to={"/post"}>
          <Button label={"Add Post"} />
        </Link>
      </div>

      <section className="w-2/3 p-4 bg-white border rounded-md flex flex-wrap justify-center max-md:w-full">
        {startupItems.length > 0 ? (
          startupItems.map((item) => (
            <Card
              key={item.startup_id}
              startupInfo={item}
              handleClick={() => handleStartupClick(item)}
            />
          ))
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <div className="text-xl">
            Uh ohh! Nothing to see here, try some different search query
          </div>
        )}
      </section>

      {/* Load More Button */}
      {loading ? (
        <LoadingSpinner />
      ) : startupItems.length > 0 ? (
        <div className="m-4">
          <Button label={"Load More"} onClick={handleLoadMore} />
        </div>
      ) : (
        ""
      )}
      {/* Render the Modal */}
      {selectedStartup && (
        <Modal startupInfo={selectedStartup} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default Home;
