import React from 'react'
import './TvCard.scss'

interface TvCardProps{
  backdrop_path: string,
  first_air_date: string,
  genre_ids: Array<2>,
  id: number,
  name: string,
  origin_country: Array<1>
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string
  vote_average: number,
  vote_count: number,
}

export const TvCard: React.FC<TvCardProps> = (props) => {
  const API_IMG = 'https://image.tmdb.org/t/p/w500'
  return (
    <div className='tv_card'>
      <div className="tv_card_img">
        <img src={API_IMG + props.poster_path} alt="" />
      </div>
      <div className='tv_card_details'>
        <p className='tv_name'>{props.original_name}</p>
        <p className='vote_average'>{props.vote_average}</p>
      </div>
    </div>
  )
}
