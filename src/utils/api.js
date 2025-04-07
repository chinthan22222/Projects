export const fetchMovies = async (query) => {
  try {
    const res = await fetch(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=192c0064`);
    const data = await res.json();
    if (data.Response === 'True') {
      // Fetch detailed data for each movie
      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const movieRes = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=192c0064`);
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