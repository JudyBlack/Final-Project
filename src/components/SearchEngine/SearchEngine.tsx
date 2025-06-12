import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchEngine.scss';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const SearchEngine: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null); // For detecting clicks outside

  const handleSearch = async () => {
    if (query.trim() === '') {
      setMovies([]); // Clear results if query is empty
      setNoResults(false);
      return;
    }

    try {
      const apiKey = 'bcc17120a385c08820f57a74b97eef53';
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );

      const results = response.data.results;
      setMovies(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNoResults(true);
    }
  };

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  // Handle key press for Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setMovies([]); // Close results if clicking outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close results if query is empty
    if (query.trim() === '') {
      setMovies([]);
      setNoResults(false);
    }
  }, [query]);

  const handleMovieClick = () => {
    setMovies([]); // Clear search results
    setQuery(''); // Clear the search input
};


  return (
    <div>
      <div className="search-container" ref={searchContainerRef}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line for Enter key functionality
        />
        <button onClick={handleSearch}>Search</button>
        <div className="searched_data">
          {noResults ? (
            <p>No results found</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id} className="searched_movies">
                  {/* Wrap movie title and image with Link */}
                  <Link to={`/movie/${movie.id}`} className="movie-link" onClick={handleMovieClick}>
                    <h3>{movie.title}</h3>
                    <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchEngine;
