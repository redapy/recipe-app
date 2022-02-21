import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Recipe from "./Recipe";
import ThemeProvider from "../../context/ThemeContext";

describe("Recipe page", () => {
  const MockedRecipe = ({ id }) => {
    return (
      <ThemeProvider>
        <MemoryRouter initialEntries={[`/recipes/${id}`]}>
          <Route path="/recipes/:id">
            <Recipe />
          </Route>
        </MemoryRouter>
      </ThemeProvider>
    );
  };
  describe("Renders", () => {
    it("Renders a recipe component", () => {
      render(<MockedRecipe />);
      const recipeWrapper = screen.getByTestId("recipe-page");
      expect(recipeWrapper).toBeInTheDocument();
    });
    it("should render an error message if the url is not valid", async () => {
      render(<MockedRecipe />);
      const errorMessage = await screen.findByText(/could not fetch the data/i);
      expect(errorMessage).toBeInTheDocument();
    });
    it("should render the recipe title", async () => {
      render(<MockedRecipe id="1" />);
      const loadingMessage = await screen.findByText(/Veggie Stew/i);
      expect(loadingMessage).toBeInTheDocument();
    });
    it("should render a recipe cooking time", async () => {
      render(<MockedRecipe id="1" />);
      const cookingTime = await screen.findByText(/Takes 45 minutes to cook./i);
      expect(cookingTime).toBeInTheDocument();
    });
    it("should render a recipe ingredients", async () => {
      render(<MockedRecipe id="1" />);
      const ingredient = await screen.findByText(/1 Carrot/i);
      expect(ingredient).toBeInTheDocument();
      const secondIngredient = await screen.findByText(/1 leek/i);
      expect(secondIngredient).toBeInTheDocument();
    });
    it("should render a recipe method", async () => {
      render(<MockedRecipe id="1" />);
      const partOfMethod = await screen.findByText(
        /Pre-heat the oven to 200C/i
      );
      expect(partOfMethod).toBeInTheDocument();
    });
  });
});
