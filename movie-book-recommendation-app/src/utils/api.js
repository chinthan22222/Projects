export const fetchMovies = async (query) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY; // Fetch API key from environment variable
    if (!apiKey) {
      throw new Error('API key is missing. Please set NEXT_PUBLIC_OMDB_API_KEY in .env.local.');
    }

    const res = await fetch(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=${apiKey}`);
    const data = await res.json();
    if (data.Response === 'True') {
      // Fetch detailed data for each movie
      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const movieRes = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
          return await movieRes.json();
        })
      );
      return detailedMovies;
    } else {
      console.error('Error fetching movies:', data.Error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
