//function to add ingredients
import { screen, fireEvent } from "@testing-library/react";
export const addIngredient = (ingredient) => {
  const ingredientsInput = screen.getByLabelText(/Recipe Ingredients:/i);
  const addButton = screen.getByText("add");
  fireEvent.change(ingredientsInput, { target: { value: ingredient } });
  fireEvent.click(addButton);
};

export const changemode = () => {
  const modeIcone = screen.getByAltText("dark/light toggle icon");
  fireEvent.click(modeIcone);
};
