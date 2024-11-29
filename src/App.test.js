import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("should initialize app state correctly", () => {
  render(<App />);
  
  const textbox = screen.getByRole('textbox', { name: /search/i });
  expect(textbox).toHaveValue(''); 

  const pokemonData = screen.queryByTestId('pokemon-data');
  expect(pokemonData).toBeNull();
});
