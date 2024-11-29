import React from 'react';
import SearchPage from './SearchPage';

export default {
  title: 'Components/SearchPage',
  component: SearchPage,
  argTypes: {
    searchTerm: { control: 'text', defaultValue: '' },
    error: { control: 'text', defaultValue: '' },
    onSearch: { action: 'search triggered' },
    onRandomSearch: { action: 'random search triggered' },
    onGoToPokedex: { action: 'navigated to Pokedex' },
  },
};

export const Default = (args) => (
  <SearchPage
    searchTerm={args.searchTerm}
    setSearchTerm={() => { }}
    onSearch={args.onSearch}
    onRandomSearch={args.onRandomSearch}
    error={args.error}
    onGoToPokedex={args.onGoToPokedex}
  />
);

export const WithError = (args) => (
  <SearchPage
    searchTerm={args.searchTerm}
    setSearchTerm={() => { }}
    onSearch={args.onSearch}
    onRandomSearch={args.onRandomSearch}
    error="Pokemon not found!"
    onGoToPokedex={args.onGoToPokedex}
  />
);
