import React from "react";
import { Link } from "react-router-dom";

const Hearder = () => {
  return (
    <div className="container">
      <Link to="/">Home</Link>
      <Link to="/market">Market</Link>
    </div>
  );
};

export default Hearder;
