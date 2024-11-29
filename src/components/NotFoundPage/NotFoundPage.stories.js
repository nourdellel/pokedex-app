import React from 'react';
import NotFoundPage from './NotFoundPage';

export default {
    title: 'Components/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
        onBack: { action: 'clicked' },
    },
};

const Template = (args) => <NotFoundPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    onBack: () => console.log('Back button clicked'),
};
