import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  test("renders E-Shop logo and main nav items", () => {
    render(
      <BrowserRouter>
        <Header setSearchQuery={() => {}} setSelectedCategory={() => {}} />
      </BrowserRouter>
    );

    // Logo
    expect(screen.getByText(/E-Shop/i)).toBeInTheDocument();

    // Navigation items
    expect(screen.getByTitle("Home")).toBeInTheDocument();
    expect(screen.getByTitle("Wishlist")).toBeInTheDocument();
    expect(screen.getByTitle("Cart")).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();

    // Search input
    expect(screen.getByPlaceholderText(/Search products/i)).toBeInTheDocument();
  });
});
