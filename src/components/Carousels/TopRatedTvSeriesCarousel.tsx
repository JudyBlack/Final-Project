import React, { useEffect, useState } from 'react';
import { Carousel, Card } from 'antd';
import { Link } from 'react-router-dom';

interface TVSeries {
  id: number;
  name: string;
  poster_path: string | null;
}

const TopRatedTVSeriesCarousel: React.FC = () => {
  const [tvSeries, setTVSeries] = useState<TVSeries[]>([]);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US&page=1`;

    const fetchTopRatedTVSeries = async () => {
      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setTVSeries(data.results);
        }
      } catch (error) {
        console.error('Error fetching top-rated TV series:', error);
      }
    };

    fetchTopRatedTVSeries();
  }, []);
  const API_IMG = 'https://image.tmdb.org/t/p/w500'

  return (
    <Carousel autoplay draggable slidesToShow={5} slidesToScroll={5} dots= {false} style={{width: '100%' , height: 400, }}>
      {tvSeries.map((series) => (
        <Link to={`/tvseries/${series.id}`} className="card">
        <div className='card_img'>
          <img src={API_IMG + series.poster_path} alt="" />
        </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default TopRatedTVSeriesCarousel;
