import React from 'react';
import Pokedex from './Pokedex';

export default {
  title: 'Components/Pokedex',
  component: Pokedex,
  argTypes: {
    onBack: { action: 'clicked' },
  },
};

const Template = (args) => <Pokedex {...args} />;

export const WithMockedData = Template.bind({});
WithMockedData.args = {
  onBack: () => console.log('Back button clicked'),
};
