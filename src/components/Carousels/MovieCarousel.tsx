import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import { Carousel } from 'antd';
import './MovieCarousel.scss'


export interface IMovieCardProps{
    adult: boolean,
    backdrop_path: string,
    genre_ids: object,
    id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    runtime: number,
    genres: {
      map(arg0: (genre: any) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
      id: number;
      name: string;
    }
  }
  
  
const HomePageCarousel = () => {
  const [movies, setMovies] = useState<IMovieCardProps[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US&page=1'
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  const API_IMG = 'https://image.tmdb.org/t/p/w500'
  return (
    <div className='carousel_container'>
      <Carousel autoplay slidesToShow={1} slidesToScroll={1} dots={false} style={{ width: '100%', height: 400 }} className='main_carousel'>
        {movies?.map((movie) => (
          <div className='card' key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div className='card_content'>
                <img src={API_IMG + movie.poster_path} alt="" />
                <div className='card_text'>
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>

  );
};

export default HomePageCarousel;

