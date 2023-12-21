import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMovieCardProps } from '../../Cards/MovieCard';
import './MovieDetails.scss'
import { getAuth } from 'firebase/auth';
import { CastCarousel } from '../../Carousels/CastCarousel';

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

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieCardProps | null>(null);
  const [cast, setCast] = useState<IActor[]>([]);

  // const firebaseConfig = {
  //   apiKey: "AIzaSyAYRhM0hRpdGiaLP6Sj6FbThFhB2hiARYM",
  //   authDomain: "film-website-bc42f.firebaseapp.com",
  //   projectId: "film-website-bc42f",
  //   storageBucket: "film-website-bc42f.appspot.com",
  //   messagingSenderId: "779630627693",
  //   appId: "1:779630627693:web:d3db16fa516dabe3e46864"
  // };
  
  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  
  // const auth = getAuth();

  // const navigate = useNavigate();

  useEffect(() => {

    // if(auth.currentUser === null) {
    //   navigate('/login')
    // } else {
      const fetchMovieDetails = async () => {
        const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=bcc17120a385c08820f57a74b97eef53&language=en-US`;
        const creditsApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bcc17120a385c08820f57a74b97eef53`;
        try {
          const [movieResponse, creditsResponse] = await Promise.all([
            fetch(apiUrl),
            fetch(creditsApiUrl),
          ]);
  
          if (!movieResponse.ok || !creditsResponse.ok) {
            throw new Error('An error occurred while fetching data.');
          }
  
          const movieData = await movieResponse.json();
          const castData = await creditsResponse.json();
  
          setMovie(movieData);
          setCast(castData.cast);

          console.log(movieData)

        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMovieDetails();
    // }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const API_IMG = 'https://image.tmdb.org/t/p/w500'

  return (
    <div>
      <div className='details_container'>
        <div className='details_img_part'>
          <img src={API_IMG + movie.poster_path} alt="" />
        </div>
        <div className='details'>
          <h2>{movie.title}</h2>
          <p><b>Release Date:</b> {movie.release_date}</p>
          <p><b>Language:</b> {movie.original_language}</p>
          <p><b>Runtime:</b> {movie.runtime} min</p>
          {/* <p><b>Genre:</b> {movie.genres.map((genre) => <span key={genre.id}> {genre.name}</span>)}</p> */}
          <p><b>Overview:</b> {movie.overview}</p>
        
        <div className='cast'>
            <h3>Cast:</h3> 
            <CastCarousel />
          </div>
      </div>  
      </div>  
    </div>
  );
};

export default MovieDetails;
