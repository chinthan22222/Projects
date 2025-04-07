// src/pages/books/index.js
import { useEffect, useState } from 'react';
import { fetchBooks } from '../../utils/api';
import BookCard from '../../components/BookCard';
import SearchBar from '../../components/SearchBar';
import styles from '../../styles/Home.module.css';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        setLoading(true);
        try {
            const data = await fetchBooks(query);
            setBooks(data.docs || []); // Adjust based on the API response structure
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);
            try {
                const data = await fetchBooks(''); // Fetch all books or a default query
                setBooks(data.docs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className={styles.grid}>
                {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BooksPage;
