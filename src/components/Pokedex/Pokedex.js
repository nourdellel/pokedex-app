import React, { useEffect, useState } from 'react';
import './Pokedex.css';

const Pokedex = ({ onBack }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [allFetched, setAllFetched] = useState(false);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
      const data = await response.json();

      const pokemonPromises = data.results.map(async (pokemon) => {
        try {
          const pokemonDetails = await fetch(pokemon.url);
          return await pokemonDetails.json();
        } catch (error) {
          console.error('Failed to fetch Pokémon details:', error);
          return null;
        }
      });

      const pokemonData = await Promise.all(pokemonPromises);

      const validPokemonData = pokemonData.filter((pokemon) => pokemon !== null);

      setPokemonList((prevData) => [...prevData, ...validPokemonData]);
      setOffset(offset + 20);
      setLoading(false);

      if (data.results.length < 20) {
        setAllFetched(true);
      }
    } catch (error) {
      console.error('Failed to fetch Pokémon list:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const loadMorePokemon = () => {
    if (!loading && !allFetched) {
      fetchPokemonData();
    }
  };

  if (loading && pokemonList.length === 0) {
    return <div className="loading">Loading Pokémon...</div>;
  }

  return (
    <div className="pokedex-container">
      <button className="pokedex-back-btn" aria-label="Back" onClick={onBack}></button>
      <h1 className="pokedex-title">Pokedex</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id || pokemon.name} className="pokemon-card">
            <img
              src={pokemon.sprites?.front_default || 'default-image-url'}
              alt={pokemon.name || 'Unknown Pokémon'}
              className="pokemon-image-pokedex"
            />
            <h2 className="pokemon-name">{pokemon.name || 'Unknown'}</h2>
            <div className="type-container">
              {pokemon.types?.map((type) => (
                <span key={type.type.name} className={`type-badge ${type.type.name}`}>
                  {type.type.name}
                </span>
              )) || <span>No types available</span>}
            </div>
          </div>
        ))}
      </div>
      {!allFetched && (
        <button aria-label="Load More" className="load-more" onClick={loadMorePokemon}>
          {loading ? 'Loading more...' : 'Load More'}
        </button>
      )}


    </div>
  );
};

export default Pokedex;
