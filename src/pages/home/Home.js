import { useState } from "react";
import RecipeList from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch";
import "./Home.css";

const Home = () => {
  const [trigger, setTrigger] = useState(false);
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/recipes",
    "GET",
    trigger
  );
  const deleteRecipe = async (id) => {
    await fetch(`http://localhost:3000/recipes/${id}`, { method: "DELETE" });
    console.log("recipe has been deleted");
    setTrigger((prv) => !prv);
  };
  return (
    <div data-testid="home" className="home">
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} deleteRecipe={deleteRecipe} />}
    </div>
  );
};

export default Home;
