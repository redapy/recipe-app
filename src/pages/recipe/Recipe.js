import { useParams } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import { useCallback, useEffect, useState } from "react"
//firestore
import { db } from "../../firebase/config"
import { doc, getDoc } from "firebase/firestore"


// styles
import './Recipe.css'

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const {mode} = useTheme();

  const fetchRecipe = useCallback( async () => {
    setIsLoading(true)
    const recipeRef = doc(db, 'recipes', id);
    const recipeSnapshot = await getDoc(recipeRef);
    if (recipeSnapshot.exists()) {
      setIsLoading(false)
      setError(null)
      setRecipe(recipeSnapshot.data())
    } else {
      setIsLoading(false)
      setError('There is no such a recipe')
    }
  }, [id])

  useEffect(() => {
    fetchRecipe()
  }, [fetchRecipe])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>ing</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}

export default Recipe