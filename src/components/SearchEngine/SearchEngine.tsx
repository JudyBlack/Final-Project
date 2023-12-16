import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchEngine.scss'

interface Movie {
  id: number;
  title: string;
  poster_path: string
}

const SearchEngine: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const handleSearch = async () => {
    if (query.trim() === '') {
      setMovies([]);
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



  useEffect(() => {
    const handleClickOutside = () => {
      setMovies([]);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='searched_data'>
        {noResults ? (
          <p>No results found</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id} className='searched_movies'>
                <h3>{movie.title}</h3>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />                
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchEngine;
