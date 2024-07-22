import React from 'react';
import './Loader.css'; 

const Loader = () => {
  return (
    <div id="loader">
      <img src={`${process.env.PUBLIC_URL}/assets/loader.webp`} alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;
