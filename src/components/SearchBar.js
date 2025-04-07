import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, placeholder = 'Search for movies...' }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={styles.searchInput}
                aria-label="Search input"
            />
            <button 
                type="submit" 
                className={styles.searchButton}
                disabled={!query.trim()}
                aria-label="Search"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;