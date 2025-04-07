import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BookDetail() {
  const { query } = useRouter();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`https://openlibrary.org/works/${query.id}.json`);
      const data = await res.json();
      setBook(data);
    };

    if (query.id) {
      fetchBook();
    }
  }, [query.id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description || 'No description available'}</p>
      <p><strong>Author(s):</strong> {book.authors?.map(author => author.name).join(', ')}</p>
    </div>
  );
}