import { render, screen, fireEvent } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Create from "./Create";

describe("Create component", () => {
  const MockedCreate = () => {
    return (
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
  };
  //function to add ingredients
  const addIngredient = (ingredient) => {
    const ingredientsInput = screen.getByLabelText(/Recipe Ingredients:/i);
    const addButton = screen.getByText("add");
    fireEvent.change(ingredientsInput, { target: { value: ingredient } });
    fireEvent.click(addButton);
  };
  //tests
  describe("Renders", () => {
    it("should render a create page", () => {
      render(<MockedCreate />);
      const divWarpper = screen.getByTestId("create-page");
      expect(divWarpper).toBeInTheDocument();
    });
    it('should render a title "Add a New Recipe"', () => {
      render(<MockedCreate />);
      const title = screen.getByText("Add a New Recipe");
      expect(title).toBeInTheDocument();
    });
    it("should render a form", () => {
      render(<MockedCreate />);
      const form = screen.getByTestId("form");
      expect(form).toBeInTheDocument();
    });
    it("should render a button with text of add", () => {
      render(<MockedCreate />);
      const addButton = screen.getByText("add");
      expect(addButton).toBeInTheDocument();
    });
    it("user should render a submit button", () => {
      render(<MockedCreate />);
      const submitButton = screen.getByText("submit");
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("Filling the form", () => {
    it("user should be able to write in the title input", () => {
      render(<MockedCreate />);
      const titleInput = screen.getByLabelText(/Recipe title:/i);
      expect(titleInput).toBeInTheDocument();
      fireEvent.change(titleInput, { target: { value: "Couscous" } });
      expect(titleInput.value).toBe("Couscous");
    });
    it("user should be able to type in the ingredients input", () => {
      render(<MockedCreate />);
      const ingredientsInput = screen.getByLabelText(/Recipe Ingredients:/i);
      expect(ingredientsInput).toBeInTheDocument();
      fireEvent.change(ingredientsInput, { target: { value: "carrot" } });
      expect(ingredientsInput.value).toBe("carrot");
    });
    it("users should be able to add ingredients", () => {
      render(<MockedCreate />);
      const p = screen.getByText(/current ingredients/i);
      addIngredient("potato");
      expect(p).toHaveTextContent("Current ingredients: potato,");
      addIngredient("salt");
      expect(p).toHaveTextContent("Current ingredients: potato, salt,");
    });
    it("users shoult NOT be able to add the same ingredients twice", () => {
      render(<MockedCreate />);
      const p = screen.getByText(/current ingredients/i);
      addIngredient("potato");
      addIngredient("potato");
      expect(p.textContent).not.toBe("Current ingredients: potato, potato,");
    });
    it("user shoul be able to type in the method textArea", () => {
      render(<MockedCreate />);
      const textArea = screen.getByLabelText(/Recipe Method:/i);
      expect(textArea).toBeInTheDocument();
    });
  });
});
