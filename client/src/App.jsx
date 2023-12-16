import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
  return (
    // <BrowserRouter>
    <main className="relative">
      {/* Navbar */}
      <Nav />
      {/* Hero Section */}
      <section>Hero</section>
      {/* Cards Section */}
      <section>Cards</section>
    </main>
    // </BrowserRouter>
  );
};

export default App;
