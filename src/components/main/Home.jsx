import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1> Welcome to the Home Page </h1>
      <Link to="/market">Go to Market</Link>
    </div>
  );
};

export default Home;
