import RecipeList from "../../components/RecipeList";
import "./Home.css";
//firestore
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
      setisLoading(true);
      const recipesRef = collection(db, "recipes");
      const unsub = onSnapshot(recipesRef, (recipeSnapshot) => {
        if (recipeSnapshot.empty) {
          setError("Can not find any Recipes");
          setisLoading(false);
        } else {
          let results = [];
          recipeSnapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setisLoading(false);
        }
      }, error => {
        setError(error.message);
        setisLoading(false);
      });
 

    return () => unsub()
  }, []);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
