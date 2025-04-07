import Link from 'next/link';
import styles from './Navbar.module.css'; // Import styles for Navbar

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        MovieApp
      </Link>
      <ul className={styles.navList}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        <li>
          <Link href="/books">Books</Link>
        </li>
        <li>
          <Link href="/favorites">Fav</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;