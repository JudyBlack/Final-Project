import "./App.scss";
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';

import MoviePage from './Pages/MoviePage/MoviePage';
import Login from './Pages/login_and_register/Login';
import { TvSeriesPage } from './Pages/TvSeriesPage/TvSeriesPage';
import Register from './Pages/login_and_register/register';
import TvSeriesDetails from "./components/Details/Tv/TvDetails";
import MovieDetails from "./components/Details/Movie/MovieDetails";
import HomePage from "./Pages/HomePage/HomePage";
import SearchEngine from "./components/SearchEngine/SearchEngine";
// import { WatchList } from "./Pages/WatchList/Watchlist";

export function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='login' element={<Login/> } />
        <Route path='moviePage' element={<MoviePage /> } />   
        <Route path='tv_series' element={<TvSeriesPage />} />
        <Route path='movie/:id' element={<MovieDetails />} />
        <Route path='tvSeries/:id' element={<TvSeriesDetails />} />
        <Route path="/search" element={<SearchEngine />} />
        <Route path='register' element={<Register/> } />
        {/* <Route path='WatchList' element={<WatchList/> } /> */}
      

      </Routes>
      
      

      
    </div>
  )
};


