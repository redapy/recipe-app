import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ThemeProvider from "../../context/ThemeContext";
import Home from "./Home";

const recipes = [
          {
            id: "1",
            title: "Veggie Stew",
            ingredients: ["1 Carrot", "1 Leek", "200g Tofu", "300ml Veg stock"],
            method: "blah blah blah",
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
            method: "blah blah",
            cookingTime: "35 minutes",
          },
        ]

jest.mock('../../hooks/useFetch', () => ({
  useFetch: () => ({
    data: recipes,
    isLoading: false,
    error: false,
  })
})

)
describe("Home Component", () => {
  const MockedHome = () => {
    return (
        <ThemeProvider>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        </ThemeProvider>
    )}
 it('Renders a RecipeLIst component', () => {
   render(<MockedHome />)
   const recipWrapper = screen.getByTestId('recipe-component');
   expect(recipWrapper).toBeInTheDocument();
 })
});
