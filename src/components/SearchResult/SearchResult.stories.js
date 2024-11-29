import React from "react";
import SearchResult from "./SearchResult";

const samplePokemon = {
  name: "Pikachu",
  types: ["Electric"],
  description: "A mouse-like Pokémon with yellow fur that can generate electricity.",
  stats: [
    { name: "hp", value: 35 },
    { name: "attack", value: 55 },
    { name: "defense", value: 40 },
    { name: "special-attack", value: 50 },
    { name: "special-defense", value: 50 },
    { name: "speed", value: 90 },
  ],
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  evolutions: {
    species: { name: "Pichu", url: "https://pokeapi.co/api/v2/pokemon/172/" },
    evolves_to: [
      {
        species: { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        evolves_to: [
          {
            species: { name: "Raichu", url: "https://pokeapi.co/api/v2/pokemon/26/" },
          },
        ],
      },
    ],
  },
  moves: [
    { move: "Thunder Shock", version_group_details: [{ level_learned_at: 1 }] },
    { move: "Quick Attack", version_group_details: [{ level_learned_at: 1 }] },
    { move: "Electro Ball", version_group_details: [{ level_learned_at: 22 }] },
    { move: "Thunder Wave", version_group_details: [{ level_learned_at: 13 }] },
  ],
};

export default {
  title: "Components/SearchResult",
  component: SearchResult,
  argTypes: {
    onBack: { action: "Back button clicked" },
  },
};

const Template = (args) => <SearchResult {...args} />;

export const Default = Template.bind({});
Default.args = {
  pokemon: samplePokemon,
  onBack: () => { },
};
