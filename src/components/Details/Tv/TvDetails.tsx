import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TvCardProps } from '../../Cards/TvCard';
import './TvDetails.scss'
// import { CastCarousel } from '../Carousels/CastCarousel';

interface Params {
  id: number;
  [key: number]: string | undefined;
}

interface IActor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const TvSeriesDetails: React.FC = () => {
  const { id } = useParams();
  const [tvSeries, setTvSeries] = useState<TvCardProps | null>(null);
  const [cast, setCast] = useState<IActor[]>([]);



  useEffect(() => {
      const fetchTvSeriesDetails = async () => {
        const api_tv_Url = `https://api.themoviedb.org/3/tv/${id}?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US`;
        const creditsApiUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=bcc17120a385c08820f57a74b97eef53`;

        console.log('apiUrl:', api_tv_Url);
        console.log('creditsApiUrl:', creditsApiUrl);

        try {
          const [tvResponse, creditsResponse] = await Promise.all([
            fetch(api_tv_Url),
            fetch(creditsApiUrl),
          ]);
  
          if (!tvResponse.ok || !creditsResponse.ok) {
            throw new Error('An error occurred while fetching data.');
          }
  
          const tvSeriesData = await tvResponse.json();
          const castData = await creditsResponse.json();

          console.log('tvSeriesData:', tvSeriesData);
          console.log('castData:', castData);
  
          setTvSeries(tvSeriesData);
          setCast(castData.cast);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchTvSeriesDetails();

  }, [id]);

  if (!tvSeries) {
    return <div>Loading...</div>;
  }

  const API_IMG = 'https://image.tmdb.org/t/p/w500'

  return (
    <div>
      <div className='details_container'>
        <div className='details_img_part'>
          <img src={API_IMG + tvSeries.poster_path} alt="" />
        </div>
        <div className='details'>
          <h2>{tvSeries.name}</h2>
          <p><b>Release Date:</b> {tvSeries.first_air_date}</p>
          <p><b>Language:</b> {tvSeries.original_language}</p>
          <p><b>Vote Average:</b> {tvSeries.vote_average}</p>
          <p><b>Episodes:</b> {tvSeries.number_of_episodes}</p>
          <p><b>Overview:</b> {tvSeries.overview}</p>
      </div>  
      </div>  
    </div>
  );
};

export default TvSeriesDetails;
