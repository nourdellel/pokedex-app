import React from "react";
import "./NotFoundPage.css";
import PsyduckImage from "../../assets/images/Psyduck.png";

const NotFoundPage = ({ onBack }) => {
  return (
    <div className="not-found-page">
      <button className="not-found-back-btn" onClick={onBack}></button>
      <div className="not-found-content">
        <h1 className="not-found-text">No Pokémon Found !</h1>
        <img src={PsyduckImage} alt="Psyduck" className="not-found-image" />
      </div>
    </div>
  );
};

export default NotFoundPage;
