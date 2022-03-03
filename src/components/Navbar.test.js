import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "../context/ThemeContext";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  const MockedNavbar = () => {
    return (
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    );
  };
  describe("Renders", () => {
    it("Renders a Navbar component", () => {
      render(<MockedNavbar />);
      const navbarWrapper = screen.getByTestId("navbar");
      expect(navbarWrapper).toBeInTheDocument();
    });
    it("Renders a header link to the home page", () => {
      render(<MockedNavbar />);
      const header = screen.getByText(/cooking ninja/i);
      expect(header).toBeInTheDocument();
    });
    it("Renders a link to the create recipe page", () => {
      render(<MockedNavbar />);
      const linkToCreate = screen.getByText(/create Recipe/i);
      expect(linkToCreate).toBeInTheDocument();
    });
  });
});
