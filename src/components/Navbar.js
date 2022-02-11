import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

//styles
import './Navbar.css'
import SearchBar from './SearchBar';

const Navbar = () => {
    const {color} = useTheme();
    return ( 
        <div data-testid='navbar' className="navbar" style={{background: color}}>
            <nav>
                <Link to="/" className="brand">
                    <h1>Cooking Ninja</h1>
                </Link>
                <SearchBar />
                <Link to="/create">Create Recipe</Link>
            </nav>
        </div>
     );
}
 
export default Navbar;