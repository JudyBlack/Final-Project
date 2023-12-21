import React from 'react';
import "./App.scss";
import { Route, Routes } from 'react-router-dom';


import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './Pages/HomePage/HomePage';
import MoviePage from './Pages/MoviePage/MoviePage';
import Login from './Pages/login/Login';
import { TvSeriesPage } from './Pages/TvSeriesPage/TvSeriesPage';





export function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='login' element={<Login/> } />
        <Route path='moviePage' element={<MoviePage /> } />   
        <Route path='tv_series' element={<TvSeriesPage />} ></Route>
      </Routes>
      
      

      
    </div>
  )
};


