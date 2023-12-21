import { Link } from 'react-router-dom';
import React from 'react';
import { Carousel } from 'antd';


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
  
  
  
  
  
  export const CarouselComponent: React.FC<IMovieCardProps> = (props) => {
  
    const API_IMG = 'https://image.tmdb.org/t/p/w500'
  
    return (
      <div>
        <Carousel draggable slidesToShow={5} style={{width:700, height: 200}}>
           <img src={API_IMG + props.poster_path} alt="" />
       </Carousel>

      </div>
  
    )
  }
  