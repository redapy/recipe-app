import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ThemeProvider from "../context/ThemeContext";
import RecipeList from "./RecipeList";

describe("RecipeList Component", () => {
  const props = [
    {
      id: "1",
      title: "Veggie Stew",
      ingredients: ["1 Carrot", "1 Leek", "200g Tofu", "300ml Veg stock"],
      method:
        "1. Pre-heat the oven to 200C/3C/gas 5. Place the carrot, leek and tofu in a large bowl. Add the stock and mix well. 2. Add the rest of the ingredients and mix well. 3. Place the mixture in a large bowl and cover with a lid. 4. Place the lid on the oven and cook for 40 minutes. 5. Serve with a slaw of your choice",
      cookingTime: "45 minutes",
    },
    {
      id: "2",
      title: "Veggie Pizza",
      ingredients: [
        "1 Base",
        "Tomata pasata",
        "1 Green pepper",
        "100g Mushrooms",
      ],
      method:
        "1. Pre-heat the oven to 200C/3C/gas 5. Add the pasata, green pepper and mushrooms to the base. Place the lid on the oven and cook for 30 minutes. 5. Serve with a slaw of your choice",
      cookingTime: "35 minutes",
    },
  ];
  const MockedRecipeList = ({ recipes }) => {
    return (
      <ThemeProvider>
        <MemoryRouter>
          <RecipeList recipes={recipes} />
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  describe("Renders", () => {
    it("Renders a Recipe component", () => {
      render(<MockedRecipeList recipes={props} />);
      const recipeWrapper = screen.getByTestId("recipe-component");
      expect(recipeWrapper).toBeInTheDocument();
    });
    it("Renders two recipes wrappere recipe wrapper", () => {
      render(<MockedRecipeList recipes={props} />);
      const recipeWrapper = screen.getAllByTestId("recipe-wrapper");
      expect(recipeWrapper.length).toBe(2);
    });
    it("Renders a no recipe message when there is no recipes", () => {
      render(<MockedRecipeList recipes={[]} />);
      const message = screen.getByText(/no recipes to load.../i);
      expect(message).toBeInTheDocument();
    });
  });
});
