import React, { useEffect, useState } from 'react';
import { Carousel, Card } from 'antd';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}


const OnTheAirMoviesCarousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchOnTheAirMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US&page=1`
      );

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      }
    };

    fetchOnTheAirMovies();
  }, []);

  const API_IMG = 'https://image.tmdb.org/t/p/w500'

  return (
    <Carousel autoplay
              draggable
              slidesToShow={5} 
              slidesToScroll={5} 
              dots= {false} 
              style={{width: '100%' , height: 400}}>
      {movies?.map((movie) => (
        <Link to={`/movie/${movie.id}`} className="card">
        <div className='card_img' style={{marginBottom: 25}}>
          <img src={API_IMG + movie.poster_path} alt="" />
        </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default OnTheAirMoviesCarousel;
