import React from 'react';
import "./MovieCard.scss"
import { Link } from 'react-router-dom';
import MoviePage from '../../Pages/MoviePage/MoviePage';



export interface IMovieCardProps{
  adult: boolean,
  backdrop_path: string,
  genre_ids: object,
  id: number,
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





export const MovieCard: React.FC<IMovieCardProps> = (props) => {

  const API_IMG = 'https://image.tmdb.org/t/p/w500'

  return (
    <div>
      <Link to={`/movie/${props.id}`} className="card">
      <div className='card_img'>
        <img src={API_IMG + props.poster_path} alt="" />
      </div>
      <div className='card_details'>
        <p className='title'>{props.title}</p>
        <p className='vote_average'>{props.vote_average}</p>
      </div>
      </Link>
    </div>

  )
}
