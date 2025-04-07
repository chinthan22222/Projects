import Image from 'next/image';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  if (!movie) {
    return <div className={styles.card}>Invalid movie data</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.posterContainer}>
        <Image
          src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/images/default-poster.jpg'}
          alt={`Poster for ${movie.Title || 'Unknown Title'}`}
          className={styles.poster}
          width={250}
          height={350}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.cardTitle}>{movie.Title || 'Unknown Title'}</h2>
        <p className={styles.year}>{movie.Year || 'Unknown Year'}</p>
        <p className={styles.genre}>{movie.Genre || 'Unknown Genre'}</p>
        <p className={styles.rating}>
          {movie.imdbRating && movie.imdbRating !== 'N/A'
            ? `⭐ ${movie.imdbRating}/10`
            : 'No rating available'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;