import RecipeList from '../../components/RecipeList';
import {useFetch} from '../../hooks/useFetch';
import './Home.css'


const Home = () => {
    const {data, isLoading, error} = useFetch('http://localhost:3000/recipes');
    return ( 
        <div data-testid='home' className="home">
            {error && <p className="error">{error}</p>}
            {isLoading && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
      </div>
     );
}
 
export default Home;