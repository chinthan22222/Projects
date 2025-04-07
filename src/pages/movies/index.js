import { useEffect, useState } from 'react';
import { fetchMovies } from '../../utils/api'; // Import the fetchMovies function
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import styles from '../../styles/Home.module.css';


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(''); // For filtering

  const handleSearch = async (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null); // Reset error state on initial load
      try {
        const data = await fetchMovies(searchQuery || 'batman'); // Default query if searchQuery is empty
        setMovies(data);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [searchQuery]); // Re-fetch movies when searchQuery changes

  // Filter movies based on the selected filter
  const filteredMovies = filter
    ? movies.filter((movie) => movie.Genre && movie.Genre.includes(filter))
    : movies;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬</h1>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.filterContainer}>
        <label htmlFor="filter">Filter by Genre:</label>
        <select id="filter" onChange={handleFilterChange} className={styles.filterSelect}>
          <option value="">All</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          {/* Add more genres as needed */}
        </select>
      </div>
      {loading && <p className={styles.loading}>Loading movies...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.grid}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          !loading && <p className={styles.noResults}>No movies found.</p>
        )}
      </div>
    </div>
  );
};



export default MoviesPage;