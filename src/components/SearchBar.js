import { useHistory } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import './SearchBar.css';

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.prevent.default();
        history.push(`/search?q=${term}`)
    }
    return ( 
        <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input 
          id="search" 
          type="text" 
          onChange={(e) => setTerm(e.target.value)} 
          required 
        />
      </form>
     );
}
 
export default SearchBar;