import { useFavorites } from '../hooks/useFavorites';
import styles from './BookCard.module.css';
import Image from 'next/image'; // For better image handling

const BookCard = ({ book }) => {
    const { addFavorite, removeFavorite, favorites } = useFavorites();
    const isFavorite = favorites.some(fav => fav.key === book.key);

    const handleFavoriteToggle = (e) => {
        e.preventDefault();
        if (isFavorite) {
            removeFavorite(book.key);
        } else {
            addFavorite({ ...book, type: 'book' });
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.coverContainer}>
                <Image 
                    src={book.cover?.medium || '/placeholder.png'} 
                    alt={book.title} 
                    className={styles.cover}
                    width={150}
                    height={225}
                    layout="responsive"
                    objectFit="cover"
                />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{book.title}</h2>
                <p className={styles.author}>Author: {book.author_name?.join(', ') || 'Unknown'}</p>
                <p className={styles.year}>Published: {book.first_publish_year || 'Unknown'}</p>
                <button 
                    onClick={handleFavoriteToggle} 
                    className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
    );
};

export default BookCard;