import React, { useState } from "react";

const Card = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={data.image} alt={data.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{data.title}</h3>
        <p className="card-description">{data.description}</p>
      </div>
    </div>
  );
};

export default Card;
