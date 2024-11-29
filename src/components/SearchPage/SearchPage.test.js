import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from './SearchPage';

const mockOnSearch = jest.fn();
const mockOnRandomSearch = jest.fn();
const mockSetSearchTerm = jest.fn();
const mockOnGoToPokedex = jest.fn();

describe('SearchPage Component', () => {
  test('renders the component with initial elements', () => {
    render(
      <SearchPage
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        onSearch={mockOnSearch}
        onRandomSearch={mockOnRandomSearch}
        error={null}
        onGoToPokedex={mockOnGoToPokedex}
      />
    );

    expect(screen.getByText(/pokémon name or id/i)).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /random/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /go to pokedex/i })).toBeInTheDocument();
  });

  test('calls onSearch when the search form is submitted', () => {
    render(
      <SearchPage
        searchTerm="test"
        setSearchTerm={mockSetSearchTerm}
        onSearch={mockOnSearch}
        onRandomSearch={mockOnRandomSearch}
        error={null}
        onGoToPokedex={mockOnGoToPokedex}
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /search/i }), {
      target: { value: 'Pikachu' },
    });

    fireEvent.submit(screen.getByTestId('search-form'));

    expect(mockOnSearch).toHaveBeenCalled();
  });


  test('calls onRandomSearch when the random button is clicked', () => {
    render(
      <SearchPage
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        onSearch={mockOnSearch}
        onRandomSearch={mockOnRandomSearch}
        error={null}
        onGoToPokedex={mockOnGoToPokedex}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /random/i }));

    expect(mockOnRandomSearch).toHaveBeenCalled();
  });

  test('calls onGoToPokedex when the Go to Pokedex button is clicked', () => {
    render(
      <SearchPage
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        onSearch={mockOnSearch}
        onRandomSearch={mockOnRandomSearch}
        error={null}
        onGoToPokedex={mockOnGoToPokedex}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /go to pokedex/i }));

    expect(mockOnGoToPokedex).toHaveBeenCalled();
  });

  test('displays an error message if an error prop is passed', () => {
    render(
      <SearchPage
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        onSearch={mockOnSearch}
        onRandomSearch={mockOnRandomSearch}
        error="Something went wrong"
        onGoToPokedex={mockOnGoToPokedex}
      />
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
