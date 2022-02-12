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
];
//define dynamic mocked variblaies
let mockData = recipes;
let mockIsLoading = false;
let mockError = null; 
//Mock useFetch
jest.mock("../../hooks/useFetch", () => ({
  useFetch: () => ({
    data: mockData,
    isLoading: mockIsLoading,
    error: mockError,
  }),
}));


describe("Home Component", () => {
  
  //Wrapp the home component with the provider and with the router 
  const MockedHome = () => {
    return (
      <ThemeProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it("Renders a RecipeLIst component when we successfully fetch the data", () => {
    render(<MockedHome />);
    const recipWrapper = screen.getByTestId("recipe-component");
    expect(recipWrapper).toBeInTheDocument();
  });
  it('Renders loading message when we stil fetching the data', () => {
    mockData = null;
    mockIsLoading = true;
    render(<MockedHome />)
    const loadingMessage = screen.getByText(/Loading.../i)
    expect(loadingMessage).toBeInTheDocument();
  })
  it("Renders an error message when we can not fetch the data", () => {
    mockData = null;
    mockIsLoading= false;
    mockError = 'could not fetch the data';
    render(<MockedHome />)
    const errorMessage = screen.getByText('could not fetch the data')
    expect(errorMessage).toBeInTheDocument()
  })
});
