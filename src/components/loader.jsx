







// src/components/loader.jsx



import React from "react";
import smokeLoader from "../assets/loader/loadersmoke.png";
import houseLoader from "../assets/loader/loaderhouse.png";
import "../styles/loader.css"; 

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={smokeLoader} alt="Rising Smoke" className="loader-smoke" />
      <img src={houseLoader} alt="Loading House" className="loader-house" />
    </div>
  );
};

export default Loader;
