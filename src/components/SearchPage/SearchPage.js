import React from "react";
import "./SearchPage.css";
import PokeballImage from "../../assets/images/Pokeball.png";

const SearchPage = ({ searchTerm, setSearchTerm, onSearch, onRandomSearch, error, onGoToPokedex }) => {
  return (
    <div className="search-page">
      <div
        className="background"
        style={{
          backgroundImage: `url('/images/backgroundSearch.png')`,
        }}
      >
        <div className="search-form-container">
          <div className="pokeball-container">
            <img src={PokeballImage} alt="Pokeball" className="pokeball-image" />
          </div>

          <h1 className="title">Pokémon Name or ID</h1>
          <form onSubmit={onSearch} className="search-form" data-testid="search-form">
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              aria-label="Search"

              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="buttons">
              <button type="submit" className="search-btn">
                Search
              </button>
              <button
                type="button"
                className="random-btn"
                onClick={onRandomSearch}
              >
                Random
              </button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}


        </div>
        <div className="go-to-pokedex-container">
          <button type="button" className="go-to-pokedex-btn" onClick={onGoToPokedex}>
            Go to Pokedex
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
