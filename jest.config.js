module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        '\\.(css|less)$': 'jest-transform-css', // This will mock CSS files
        '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
      },

};



