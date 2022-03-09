import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import ThemeProvider from "./context/ThemeContext";
import { addIngredient } from "./utils";

describe("App Component", () => {
  const AppWithProvider = () => {
    return (
      <ThemeProvider>
        <MemoryRouter initialEntries={[`/`]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );
  };
  describe("Full app rendering and Navigation", () => {
    it("Should render an app component", () => {
      render(<AppWithProvider />);
      const appWrapper = screen.getByTestId("app");
      expect(appWrapper).toBeInTheDocument();
    });
    it("Should render a navbar component", () => {
      render(<AppWithProvider />);
      const navbar = screen.getByTestId("navbar");
      expect(navbar).toBeInTheDocument();
    });
    it("Should render a ThemSelector component", () => {
      render(<AppWithProvider />);
      const selectorWrapper = screen.getByTestId("selector-component");
      expect(selectorWrapper).toBeInTheDocument();
    });
    it("Should render a home page", () => {
      render(<AppWithProvider />);
      const homeWrapper = screen.getByTestId("home");
      expect(homeWrapper).toBeInTheDocument();
    });

    it("Should navigates to the Create page", () => {
      render(<AppWithProvider />);
      const linkToCreate = screen.getByText("Create Recipe");
      fireEvent.click(linkToCreate);
      const createWrapper = screen.getByTestId("create-page");
      expect(createWrapper).toBeInTheDocument();
    });
    it("should navigates to the single recipe page", async () => {
      render(<AppWithProvider />);
      //back to home page
      const linkToHomePage = screen.getByText(/cooking ninja/i);
      fireEvent.click(linkToHomePage);
      //navigate to the recipe page
      const linkToRecipePage = await screen.findAllByText(/cook this/i);
      fireEvent.click(linkToRecipePage[1]);
      //check that we are in the recipe page
      const recipeWrapper = await screen.findByTestId("recipe-page");
      expect(recipeWrapper).toBeInTheDocument();
    });
  });
  describe("functionality", () => {
    it("should add the recipe to home page when submiting the create recipe form", async () => {
      render(<AppWithProvider />);
      //navigate to create page
      const linkToCreate = screen.getByText("Create Recipe");
      fireEvent.click(linkToCreate);
      // fill the title input
      const titleInput = screen.getByLabelText(/Recipe title:/i);
      fireEvent.change(titleInput, { target: { value: "Couscous" } });
      //add ingredients
      addIngredient("potato");
      addIngredient("salt");
      addIngredient("carrot");
      // fill the method textarea
      const textArea = screen.getByLabelText(/Recipe Method:/i);
      fireEvent.change(textArea, { target: { value: "bla bla bla bla" } });
      //submit
      const submitButton = screen.getByRole("button", { name: "submit" });
      fireEvent.click(submitButton);
      //we should be in the home page, reirect the user.
      const homeWrapper = await screen.findByTestId("home");
      expect(homeWrapper).toBeInTheDocument();
      //We should find the new recipe
      const newRecipe = await screen.findByText(/couscous/i);
      expect(newRecipe).toBeInTheDocument();
    });
  });
});
