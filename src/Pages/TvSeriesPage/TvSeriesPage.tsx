import React, { useState, useEffect } from 'react'
import './TvSeriesPage.scss'
import { TvCard } from '../../components/Cards/TvCard'
import Footer from '../../components/footer/footer'

type RequestType = {
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
  number_of_episodes: number
}


export const TvSeriesPage = () => {
  const [series, setSeries] = useState<RequestType[]>([]);
  const [page, setPage] = useState<number>(1);

  const API_TV_URL = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&page=` + page;

  useEffect(() => {
    fetch(API_TV_URL, {
      method: "get",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2MxNzEyMGEzODVjMDg4MjBmNTdhNzRiOTdlZWY1MyIsInN1YiI6IjY1NjcxOWQzYThiMmNhMDEyYzE0YTNkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.saenLC8stW1rjaDOCPE3UbdesCA12cXV3YQGEMEYf_4",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.results);
        
      });
  }, []);
  function loadMore() {
    setPage(page + 1);

    fetch(API_TV_URL, {
      method: "get",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2MxNzEyMGEzODVjMDg4MjBmNTdhNzRiOTdlZWY1MyIsInN1YiI6IjY1NjcxOWQzYThiMmNhMDEyYzE0YTNkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.saenLC8stW1rjaDOCPE3UbdesCA12cXV3YQGEMEYf_4",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let temporary = series
        console.log(data.results.length);
        for (let i = 0; i < data.results.length; i++) {
          temporary.push(data.results[i]);
        }
        console.log(temporary.length);
        setSeries(temporary)});
  }      


return(
  <div className='tv_series'>
    <div className='tv_series_first_section'>
      <p>Wellcome To The Tv Series Universe</p>
    </div>
    <div className='tv_series_second_section'>
      {series.map((serie) => {
      console.log('serie', series.length)
      return <TvCard
      backdrop_path = {serie.backdrop_path}
      first_air_date = {serie.first_air_date}
      genre_ids = {serie.genre_ids}
      id = {serie.id}
      name = {serie.name}
      origin_country = {serie.origin_country}
      original_language = {serie.original_language}
      original_name = {serie.original_name}
      overview = {serie.overview}
      popularity = {serie.popularity}
      poster_path = {serie.poster_path}
      vote_average = {serie.vote_average}
      vote_count = {serie.vote_count}
      number_of_episodes = {serie.number_of_episodes}
      />})}

      <button onClick={() => loadMore()} className='load_more_btn'>More +</button>
    </div>
    <Footer />
  </div>
)
}