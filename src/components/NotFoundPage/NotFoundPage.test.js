import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFoundPage from "./NotFoundPage";
jest.mock("../assets/psyduck.png", () => "mock-psyduck.png");

describe("NotFoundPage Component", () => {
  it("renders the not found text", () => {
    render(<NotFoundPage />);
    const notFoundText = screen.getByText(/no pokémon found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it("renders the Psyduck image", () => {
    render(<NotFoundPage />);
    const image = screen.getByAltText(/psyduck/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mock-psyduck.png");
  });

  it("has the correct class names applied", () => {
    render(<NotFoundPage />);
    const container = screen.getByText(/no pokémon found/i).closest("div");
    expect(container).toHaveClass("not-found-content");
  });

});
