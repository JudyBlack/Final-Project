import React, { useEffect, useState } from 'react';
import { Carousel, Card } from 'antd';
import { Link } from 'react-router-dom';
import './MovieCarousel.scss'

interface TVSeries {
  id: number;
  name: string;
  poster_path: string | null;
  overview: string,
}

const TVCarousel: React.FC = () => {
  const [tvSeries, setTVSeries] = useState<TVSeries[]>([]);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US&page=2`;

    const fetchPopularTVSeries = async () => {
      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setTVSeries(data.results);
        }
      } catch (error) {
        console.error('Error fetching popular TV series:', error);
      }
    };

    fetchPopularTVSeries();
  }, []);

  const API_IMG = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='carousel_container'>
      <Carousel autoplay slidesToShow={1} slidesToScroll={1} dots={false} style={{ width: '100%', height: 400 }} className='main_carousel'>
        {tvSeries?.map((serie) => (
          <div className='card' key={serie.id}>
            <Link to={`/movie/${serie.id}`}>
              <div className='card_content'>
                <img src={API_IMG + serie.poster_path} alt="" />
                <div className='card_text'>
                  <h3>{serie.name}</h3>
                  <p>{serie.overview}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TVCarousel;
