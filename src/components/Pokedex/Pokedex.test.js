import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";

import Pokedex from './Pokedex';

global.fetch = jest.fn((url) => {
  if (url.includes('/pokemon?limit=50&offset=0')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          ],
        }),
    });
  } else if (url.includes('/pokemon/1/')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          name: 'bulbasaur',
          sprites: { front_default: 'bulbasaur-image-url' },
          types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        }),
    });
  } else if (url.includes('/pokemon/2/')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 2,
          name: 'ivysaur',
          sprites: { front_default: 'ivysaur-image-url' },
          types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        }),
    });
  }
});


test('renders Pokedex and shows loading initially', () => {
  render(<Pokedex onBack={() => { }} />);

  expect(screen.getByText(/loading Pokémon/i)).toBeInTheDocument();
});



test('renders Pokémon data when fetched', async () => {
  render(<Pokedex onBack={() => { }} />);

  await waitFor(() => {
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /back/i }));
});


afterEach(() => {
  jest.clearAllMocks();
});
