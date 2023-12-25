import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchEngine.scss";

interface Media {
  id: number;
  title: string;
  name: string; 
  poster_path: string;
  media_type: string;
}

const SearchEngine: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [media, setMedia] = useState<Media[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const handleSearch = async () => {
    if (query.trim() === "") {
      setMedia([]);
      setNoResults(false);
      return;
    }

    try {
      const apiKey = "bcc17120a385c08820f57a74b97eef53";
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`
      );

      if (!response.ok) {
        throw new Error("An error occurred while fetching data.");
      }

      const data = await response.json();
      const results = data.results;
      setMedia(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setNoResults(true);
    }
  };

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const handleClickOutside = () => {
      setMedia([]);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for movies or TV series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="searched_data">
        {noResults ? (
          <p>No results found</p>
        ) : (
          <ul>
            {media.map((item) => (
              <li key={item.id} className="searched_movies">
                <Link to={`/${item.media_type === "movie" ? "movie" : "tvseries"}/${item.id}`}>
                  <h3>{item.title || item.name}</h3>
                  <img
                    src={`${IMAGE_BASE_URL}${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchEngine;
