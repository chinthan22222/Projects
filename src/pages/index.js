

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Import home page styles
import { fetchMovies } from '../utils/api'; // Import API function
import MovieCard from '../components/MovieCard'; // Import MovieCard component
import Navbar from '../components/Navbar'; // Import Navbar component

const Home = () => {
  const [movies, setMovies] = useState([]); // All movies
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies('top'); // Use "top" as the query to fetch top-rated movies
      if (data && data.length > 0) {
        setMovies(data); // Set the sorted movies
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>Welcome to the Movie and Book Recommendation App</h1>
          <p>Select an option below to explore movies or books:</p>
        </div>

        {/* Movies Grid Section */}
        <div className={styles.moviesContainer}>
          <h2>Featured Movies</h2>
          {loading ? (
            <p>Loading...</p>
          ) : movies.length > 0 ? (
            <div className={styles.grid}>
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <p>No movies found. Try again later.</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className={styles.links}>
          <Link href="/movies">
            <button className={styles.link}>Explore Movies</button>
          </Link>
          <Link href="/books">
            <button className={styles.link}>Explore Books</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;