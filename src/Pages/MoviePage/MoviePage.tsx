import React, { useEffect, useState } from "react";
import { MovieCard } from "../../components/Cards/MovieCard";
import './MoviePage.scss'
import Footer from "../../components/footer/footer";


type RequestType = {
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

}

const MoviePage = () => {
  const [movies, setMovies] = useState<RequestType[]>([]);
  const [page, setPage] = useState<number>(1);

  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=" + page;

  useEffect(() => {
    fetch(API_URL, {
      method: "get",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2MxNzEyMGEzODVjMDg4MjBmNTdhNzRiOTdlZWY1MyIsInN1YiI6IjY1NjcxOWQzYThiMmNhMDEyYzE0YTNkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.saenLC8stW1rjaDOCPE3UbdesCA12cXV3YQGEMEYf_4",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setPage(page + 1)
      });
  }, []);

  function loadMore() {
    setPage(page + 1);

    fetch(API_URL, {
      method: "get",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2MxNzEyMGEzODVjMDg4MjBmNTdhNzRiOTdlZWY1MyIsInN1YiI6IjY1NjcxOWQzYThiMmNhMDEyYzE0YTNkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.saenLC8stW1rjaDOCPE3UbdesCA12cXV3YQGEMEYf_4",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let temporary = movies
        console.log(data.results.length);
        for (let i = 0; i < data.results.length; i++) {
          temporary.push(data.results[i]);
        }
        console.log(temporary.length);
        setMovies(temporary)});
  }

  console.log(movies);
  return (
    <div className="movies">

      <div className="movies_first_section">
        <p>Wellcome To The Movies Universe</p>
      </div>


      <div className="movies_second_section">
      {movies.map((movie) => {
        console.log('movie', movies.length)
        return <MovieCard 
        adult={movie.adult} 
        backdrop_path={movie.backdrop_path} 
        genre_ids={movie.genre_ids}
        id={movie.id}
        original_language={movie.original_language}
        original_title={movie.original_title}
        overview={movie.overview}
        popularity={movie.popularity}
        poster_path={movie.poster_path}
        release_date={movie.release_date}
        title={movie.title}
        video={movie.video}
        vote_average={movie.vote_average}
        vote_count={movie.vote_count}

        />;

      })}
      <button onClick={() => loadMore()} className="load_more_btn">More +</button>
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
