import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMovieCardProps } from '../../Cards/MovieCard';
import { MovieCastCarousel } from '../../Carousels/CastCarousels/MovieCastCarousel';
import YouTube from 'react-youtube';
import './MovieDetails.scss'
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

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieCardProps | null>(null);
  const [cast, setCast] = useState<IActor[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bcc17120a385c08820f57a74b97eef53`;
      const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bcc17120a385c08820f57a74b97eef53`;

      try {
        const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
          fetch(movieUrl),
          fetch(creditsUrl),
          fetch(videosUrl),
        ]);

        if (!movieResponse.ok || !creditsResponse.ok || !videosResponse.ok) {
          throw new Error('An error occurred while fetching data.');
        }

        const movieData = await movieResponse.json();
        const castData = await creditsResponse.json();
        const videosData = await videosResponse.json();

        setMovie(movieData);
        setCast(castData.cast);

        const trailerVideos = videosData.results.filter((video: Video) =>
        video.name.toLowerCase().includes('trailer')
        );
        setVideos(trailerVideos);

      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const API_IMG = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      <div className='details_container'>
        <div className='details_img_part'>
          <img src={API_IMG + movie.poster_path} alt="" />
          
        </div>
        <div className='details'>
          <h2>{movie.title} </h2>
          {/* <button>Add To Watchlist</button> */}
          <p><b>Release Date:</b> {movie.release_date}</p>
          <p><b>Language:</b> {movie.original_language}</p>
          <p><b>Vote Average:</b> {movie.vote_average}</p>
          <p><b>Runtime:</b> {movie.runtime} min</p>
          <p><b>Genre:</b> {movie.genres.map((genre) => <span key={genre.id}> {genre.name}</span>)}</p>
          <p><b>Overview:</b> {movie.overview}</p>
          <div>
          <p><b>Cast:</b></p>
          <MovieCastCarousel />
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

export default MovieDetails;
