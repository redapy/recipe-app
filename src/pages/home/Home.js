import RecipeList from "../../components/RecipeList";
import "./Home.css";
//firestore
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      setisLoading(true);
      const recipesRef = collection(db, "recipes");
      const recipeSnapshot = await getDocs(recipesRef);
      if (recipeSnapshot.empty) {
        setError("Can not find any Recipes");
        setisLoading(false);
      } else {
        let results =[];
        recipeSnapshot.docs.forEach((doc) => {
            results.push({id: doc.id, ...doc.data()})
        });
        setData(results);
        setisLoading(false);
      }
    };
    try {
        fetchData();
    } catch (e) {
        setError(e.message)
    }
    
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
