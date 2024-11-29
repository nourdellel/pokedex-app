import React, { useRef, useState } from "react";
import "./SearchResult.css";

const typeColors = {
  normal: "#A8A87B",
  water: "#559EDF",
  fire: "#EE803B",
  grass: "#5DBE62",
  electric: "#F7CF43",
  ice: "#9AD8D8",
  fighting: "#BE322E",
  poison: "#a040a0",
  ground: "#DFBF6E",
  flying: "#A893ED",
  psychic: "#EC5C89",
  bug: "#A8B732",
  rock: "#B89F41",
  ghost: "#705A97",
  dark: "#705849",
  dragon: "#7043F4",
  steel: "#B8B9CF",
  fairy: "#EFB7BD",
};

const statAbbreviations = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

const renderEvolutions = (evolutions, firstTypeColor) => {
  if (!evolutions) return null;

  return (
    <div className="evolution-chain">
      <div className="evolution">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutions.species.url.split("/")[6]}.png`}
          alt={evolutions.species.name}
          className="evolution-image"
        />
        <p className="evolution-name">{evolutions.species.name}</p>
      </div>

      {evolutions.evolves_to && evolutions.evolves_to.length > 0 && (
        <>
          <div className="arrow" style={{ '--arrow-color': firstTypeColor }}>
            <svg width="94" height="8" viewBox="0 0 94 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H92" stroke="var(--arrow-color, #555)" strokeWidth="4" strokeLinecap="round" />
              <path d="M88.5 0.28744L92 4" stroke="var(--arrow-color, #555)" strokeWidth="4" strokeLinecap="round" />
              <path d="M88.5 7.28744L92 4" stroke="var(--arrow-color, #555)" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="evolution-to">
            {evolutions.evolves_to.map((evolution) =>
              renderEvolutions(evolution, firstTypeColor)
            )}
          </div>
        </>
      )}
    </div>
  );
};

const SearchResult = ({ pokemon, onBack }) => {
  const [selectedTab, setSelectedTab] = useState("stats");
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);
  if (!pokemon) return null;

  const { name, types, description, stats, image, evolutions, moves, cries } = pokemon;
  const firstType = types[0]?.toLowerCase() || "normal";
  const firstTypeColor = typeColors[firstType] || "#A8A87B";
  const cryUrl = cries?.latest;

  const renderContent = () => {
    switch (selectedTab) {
      case "evolutions":
        return (
          <div className="evolution-container">
            {renderEvolutions(evolutions, firstTypeColor)}
          </div>
        );
      case "moves":
        const shuffledMoves = [...moves].sort(() => 0.5 - Math.random());
        const randomMoves = shuffledMoves.slice(0, 3);

        return (
          <div className="moves-container">
            {Array.isArray(randomMoves) && randomMoves.length > 0 ? (
              randomMoves.map((moveData, index) => {
                const moveName = moveData?.move || "Unknown Move";
                const levelLearnedAt =
                  moveData?.version_group_details?.[0]?.level_learned_at || "N/A";
                return (
                  <div key={index} className="move">
                    <p className="move-name">{moveName}</p>
                    <p className="move-level">Level: {levelLearnedAt}</p>
                    <hr className="move-divider" />
                  </div>
                );
              })
            ) : (
              <p>No moves available.</p>
            )}
          </div>
        );
      default:
        return (
          <div className="stats-container">
            {stats.map((stat, index) => {
              const statName = statAbbreviations[stat?.name] || "UNKNOWN";
              const baseStat = stat?.value || 0;
              return (
                <div key={index} className="stat">
                  <span className="stat-name" style={{ color: `${firstTypeColor}` }}>
                    {statName}
                  </span>
                  <span className="stat-value">{baseStat}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        width: `${baseStat}%`,
                        background: `${firstTypeColor}`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        );
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cryUrl && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.volume = 0.05;
        audioRef.current.play();
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="search-result" style={{ backgroundColor: typeColors[firstType] }}>
      <div className="result-header">
        <button className="back-btn" onClick={onBack}></button>
      </div>
      <div className="result-content">
        <div className="pokemon-image-container">
          <img
            src={image}
            alt={name}
            className={`pokemon-image ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />


        </div>
        <p className="pokemon-name">{name}</p>
        <div className="type-container">
          {types.map((type) => (
            <span key={type} className={`type-badge ${type.toLowerCase()}`}>
              {type.toUpperCase()}
            </span>
          ))}
        </div>
        <p className="description">{description}</p>

        <div className="tabs">
          <button
            className="tab"
            style={{
              backgroundColor: selectedTab === "stats" ? firstTypeColor : "transparent",
              color: selectedTab === "stats" ? "white" : firstTypeColor,
            }}
            onClick={() => setSelectedTab("stats")}
          >
            Stats
          </button>
          <button
            className="tab"
            style={{
              backgroundColor: selectedTab === "evolutions" ? firstTypeColor : "transparent",
              color: selectedTab === "evolutions" ? "white" : firstTypeColor,
            }}
            onClick={() => setSelectedTab("evolutions")}
          >
            Evolutions
          </button>
          <button
            className="tab"
            style={{
              backgroundColor: selectedTab === "moves" ? firstTypeColor : "transparent",
              color: selectedTab === "moves" ? "white" : firstTypeColor,
            }}
            onClick={() => setSelectedTab("moves")}
          >
            Moves
          </button>
        </div>

        {renderContent()}

        {cryUrl && (
          <audio ref={audioRef} src={cryUrl}>
            Your browser does not support the audio tag.
          </audio>
        )}

      </div>
    </div>
  );
};

export default SearchResult;
