import React from 'react';
import "./App.scss";
import { Route, Router, Routes } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './Pages/HomePage/HomePage';
import MoviePage from './Pages/MoviePage/MoviePage';
import { TvSeriesPage } from './Pages/TvSeriesPage/TvSeriesPage';
import Login from './Pages/login/Login';
import { BrowserRouter } from 'react-router-dom';
import MovieDetails from './components/Details/Movie/MovieDetails';
import TvSeriesDetails from './components/Details/Tv/TvDetails';



export function App() {
  return (
    
    <div className='App'>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='login' element={<Login/> } />
        <Route path='moviePage' element={<MoviePage /> } />  
        <Route path="/tvseries" element={<TvSeriesPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvSeriesDetails />} />
      </Routes> 
      </BrowserRouter>  
    </div>
    
  )
};

