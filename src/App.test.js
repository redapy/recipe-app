import { fireEvent, render, screen } from "@testing-library/react";
import {createMemoryHistory} from 'history'
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ThemeProvider from "./context/ThemeContext";

describe("App Component", () => {
  const AppWithProvider = () => {
    const history = createMemoryHistory;
  return (
    <ThemeProvider>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
  }
  describe("Full app rendering and Navigation", () => {
    it ('Should render an app component', () => {
        render(<AppWithProvider />);
        const appWrapper = screen.getByTestId('app');
        expect(appWrapper).toBeInTheDocument(); 
    })
    it("Should render a navbar component", () => {
      render(<AppWithProvider />);
      const navbar = screen.getByTestId('navbar');
      expect(navbar).toBeInTheDocument();
    });
    it('Should render a ThemSelector component', () => {
        render(<AppWithProvider />)
        const selectorWrapper = screen.getByTestId('selector-component');
        expect(selectorWrapper).toBeInTheDocument()
    })
    it('Should render a home page', () => {
        render(<AppWithProvider />)
        const homeWrapper = screen.getByTestId('home');
        expect(homeWrapper).toBeInTheDocument()
    })
    
    it('Should navigates to the Create page', () => {
        render(<AppWithProvider />)
        const linkToCreate = screen.getByText('Create Recipe');
        fireEvent.click(linkToCreate);
        const createWrapper = screen.getByTestId('create-page');
        expect(createWrapper).toBeInTheDocument();
    })
  });
});