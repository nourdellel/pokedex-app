import React, { useState } from "react";
import SearchPage from "./components/SearchPage/SearchPage";
import SearchResult from "./components/SearchResult/SearchResult";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Pokedex from "./components/Pokedex/Pokedex";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [showPokedex, setShowPokedex] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found. Please try again!");
      }
      const data = await response.json();

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();

      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      const processedData = {
        name: data.name,
        types: data.types.map((type) => type.type.name),
        description: "Pokémon description not available.",
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        image: data.sprites.other["official-artwork"].front_default,
        evolutions: evolutionData.chain,
        moves: data.moves.map((move) => ({
          move: move.move.name,
          version_group_details: move.version_group_details.map(
            (versionDetail) => ({
              level_learned_at: versionDetail.level_learned_at,
              version_group: versionDetail.version_group.name,
            })
          ),
        })),
        cries: data.cries,
      };

      setPokemonData(processedData);
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
    }
  };

  const handleRandomSearch = async () => {
    console.log("Random search triggered");
  
    const randomId = Math.floor(Math.random() * 1025) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) {
        throw new Error("Pokémon not found. Please try again!");
      }
  
      const data = await response.json();
      console.log("Pokemon data received:", data);
  
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
  
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
  
      const processedData = {
        name: data.name,
        types: data.types.map((type) => type.type.name),
        description: "Pokémon description not available.",
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        image: data.sprites.other["official-artwork"].front_default,
        evolutions: evolutionData.chain,
        moves: data.moves.map((move) => ({
          move: move.move.name,
          version_group_details: move.version_group_details.map(
            (versionDetail) => ({
              level_learned_at: versionDetail.level_learned_at,
              version_group: versionDetail.version_group.name,
            })
          ),
        })),
        cries: data.cries,
      };
  
      console.log("Processed data:", processedData);
      setPokemonData(processedData);
      setError(null);
    } catch (error) {
      console.error("Error caught:", error);
      setError(error.message);
      setPokemonData(null);
    }
  };
  

  const handleGoToPokedex = () => {
    setShowPokedex(true);
    setPokemonData(null);
    setError(null);
  };

  const handleGoBack = () => {
    setShowPokedex(false);
  };

  return (
    <div>
      {showPokedex ? (
        <div>
          <Pokedex onBack={handleGoBack}/>
        </div>
      ) : (
        <>
          {!pokemonData && !error ? (
            <SearchPage
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              onRandomSearch={handleRandomSearch}
              error={error}
              onGoToPokedex={handleGoToPokedex}
            />
          ) : error ? (
            <NotFoundPage onBack={() => setError(null)} />
          ) : (
            <SearchResult
              pokemon={pokemonData}
              onBack={() => setPokemonData(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
