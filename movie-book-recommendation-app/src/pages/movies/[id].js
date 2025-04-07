import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/MovieDetail.module.css'; // Import CSS module for styling

export default function MovieDetail() {
  const { query } = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://www.omdbapi.com/?i=${query.id}&apikey=192c0064`);
        const data = await res.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'Failed to fetch movie details.');
        }
      } catch (err) {
        setError('An error occurred while fetching movie details.');
      } finally {
        setLoading(false);
      }
    };

    if (query.id) {
      fetchMovie();
    }
  }, [query.id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.posterContainer}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/images/img.jpg'}
          alt={movie.Title}
          className={styles.poster}
        />
      </div>
      <div className={styles.details}>
        <h1 className={styles.title}>{movie.Title}</h1>
        <p className={styles.plot}>{movie.Plot}</p>
        <p><strong>Release Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Rating:</strong> {movie.imdbRating !== 'N/A' ? `${movie.imdbRating}/10` : 'No rating available'}</p>
      </div>
    </div>
  );
}