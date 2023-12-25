import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TvCardProps } from '../../Cards/TvCard';
import './TvDetails.scss';
import { TvCastCarousel } from '../../Carousels/CastCarousels/TvCastCarousel';
import YouTube from 'react-youtube';
import Footer from '../../footer/footer';

interface Params {
  id: string;
}

interface IActor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

const TvSeriesDetails: React.FC = () => {
  const { id } = useParams();
  const [tvSeries, setTvSeries] = useState<TvCardProps | null>(null);
  const [cast, setCast] = useState<IActor[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchTvSeriesDetails = async () => {
      const api_tv_Url = `https://api.themoviedb.org/3/tv/${id}?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US`;
      const creditsApiUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=bcc17120a385c08820f57a74b97eef53`;
      const videosApiUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=bcc17120a385c08820f57a74b97eef53`;

      try {
        const [tvResponse, creditsResponse, videosResponse] = await Promise.all([
          fetch(api_tv_Url),
          fetch(creditsApiUrl),
          fetch(videosApiUrl),
        ]);

        if (!tvResponse.ok || !creditsResponse.ok || !videosResponse.ok) {
          throw new Error('An error occurred while fetching data.');
        }

        const tvSeriesData = await tvResponse.json();
        const castData = await creditsResponse.json();
        const videosData = await videosResponse.json();

        setTvSeries(tvSeriesData);
        setCast(castData.cast);

        // Filter videos to include only those with a recognizable name or type
        const trailerVideos = videosData.results.filter((video: Video) =>
          video.name.toLowerCase().includes('trailer') ||
          video.type.toLowerCase().includes('featurette')
        );
        setVideos(trailerVideos);

        console.log('tvSeriesData:', tvSeriesData);
        console.log('castData:', castData);
        console.log('videosData:', videosData.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTvSeriesDetails();
  }, [id]);

  if (!tvSeries) {
    return <div>Loading...</div>;
  }

  const API_IMG = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      <div className='details_container'>
        <div className='details_img_part'>
          <img src={API_IMG + tvSeries.poster_path} alt="" />
        </div>

        <div className='details'>
          <h2>{tvSeries.name} </h2>
          {/* <button>Add To Watchlist</button> */}
          <p><b>Release Date:</b> {tvSeries.first_air_date}</p>
          <p><b>Language:</b> {tvSeries.original_language}</p>
          <p><b>Vote Average:</b> {tvSeries.vote_average}</p>
          <p><b>Episodes:</b> {tvSeries.number_of_episodes}</p>
          <p><b>Genre:</b> {tvSeries.genres.map((genre) => <span key={genre.id}> {genre.name}</span>)}</p>
          <p><b>Overview:</b> {tvSeries.overview}</p>

          <div className='cast'>
            <h3>Cast:</h3>
            <TvCastCarousel />
          </div>
          
          {videos.length > 0 && (
            <div className='videos_section'>
              <h3>Videos:</h3>
              <ul>
                {videos.map((video) => (
                  <li key={video.id}>
                    <p>{video.name}</p>
                    <YouTube videoId={video.key} />
                  </li>
                ))}
              </ul>
            </div>
          )} 
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TvSeriesDetails;
