global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: [] }), // Mock API response
    })
  );
  