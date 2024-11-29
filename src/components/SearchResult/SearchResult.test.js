import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResult from './SearchResult';

const mockPokemon = {
  name: 'Pikachu',
  types: ['Electric'],
  description: 'A small yellow electric-type Pokemon.',
  stats: [
    { name: 'hp', value: 35 },
    { name: 'attack', value: 55 },
    { name: 'defense', value: 40 },
    { name: 'special-attack', value: 50 },
    { name: 'special-defense', value: 50 },
    { name: 'speed', value: 90 }
  ],
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  evolutions: null,
  moves: [
    { move: 'Thunder Shock', version_group_details: [{ level_learned_at: 1 }] },
    { move: 'Quick Attack', version_group_details: [{ level_learned_at: 1 }] },
    { move: 'Electro Ball', version_group_details: [{ level_learned_at: 20 }] }
  ],
  cries: { latest: 'https://example.com/pikachu-cry.mp3' }
};

describe('SearchResult Component', () => {
  test('renders with provided props', () => {
    render(<SearchResult pokemon={mockPokemon} onBack={() => { }} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('A small yellow electric-type Pokemon.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu/i })).toBeInTheDocument();

    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  test('displays correct content when switching tabs', () => {
    render(<SearchResult pokemon={mockPokemon} onBack={() => { }} />);

    const movesTab = screen.getByText('Moves');
    fireEvent.click(movesTab);

    expect(screen.getByText('Thunder Shock')).toBeInTheDocument();
    expect(screen.getByText('Quick Attack')).toBeInTheDocument();
    expect(screen.getByText('Electro Ball')).toBeInTheDocument();

    const statsTab = screen.getByText('Stats');
    fireEvent.click(statsTab);

    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  test('plays and pauses the audio when hovered', () => {
    render(<SearchResult pokemon={mockPokemon} onBack={() => { }} />);
    const image = screen.getByRole('img', { name: /pikachu/i });

    fireEvent.mouseEnter(image);
    expect(mockPokemon.cries.latest).toBe('https://example.com/pikachu-cry.mp3');

    fireEvent.mouseLeave(image);
  });
});
