import React from "react";
import { Link } from "react-router-dom";
import logo_w from "../assets/smartfarm.png";

const Hearder = () => {
  return (
    <div className="container flex justify-between items-center mt-10">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <img
          src={logo_w}
          alt="Logo"
          className="h-16 w-16 md:h-20 md:w-20 mr-1 rounded-lg"
        />
        <span className=" text-2xl md:text-3xl font-bold hidden lg:block">
          FarmIntelli
        </span>
      </Link>
      <Link to="/market" className="text-2xl md:text-3xl font-bold">
        market
      </Link>
    </div>
  );
};

export default Hearder;
