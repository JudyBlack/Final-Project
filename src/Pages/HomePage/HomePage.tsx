import HomePageCarousel from '../../components/Carousels/MovieCarousel'
import UpcomingMoviesCarousel from '../../components/Carousels/UpcomingMoviesCarousel'
import TopRatedMoviesCarousel from '../../components/Carousels/TopRatedMoviesCarousel'
import PopularMoviesCarousel from '../../components/Carousels/PopularMoviesCarousel'
import OnTheAirMoviesCarousel from '../../components/Carousels/OnTheAirMoviesCarousel'
import Footer from '../../components/footer/footer'
import UpcomingTVSeriesCarousel from '../../components/Carousels/UpcomingTvSeriesCarousel'
import TopRatedTVSeriesCarousel from '../../components/Carousels/TopRatedTvSeriesCarousel'
import PopularTVSeriesCarousel from '../../components/Carousels/PopularTvSeriesCarousel'
import OnTheAirTVSeriesCarousel from '../../components/Carousels/OnTheAirTvSeriesCarousel'
import './HomePage.scss'
import { Divider } from 'antd';
import TVCarousel from '../../components/Carousels/TvCaraousel'

export default function HomePage() {
  
  return (
    <div className='homepage_container'>
      <div className='container_first_section'>
        <h1>Wellcome To The Vidi Film Universe</h1>
        <span>Get Millions of Movies and TV Shows With One Click</span>
      </div>
      
      <div className='carousels'>
        <div>
          <h2>Upcoming Movies:</h2>
          <UpcomingMoviesCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>
          <h2>Top Rated Movies:</h2>
          <TopRatedMoviesCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>
          <h2>Popular Movies:</h2>
          <PopularMoviesCarousel /> 
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>        
          <h2>On The Air Movies:</h2>
          <OnTheAirMoviesCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>
          <HomePageCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>        
          <h2>Upcoming Tv Series:</h2>
          <UpcomingTVSeriesCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>        
          <h2>Top Rated Tv Series:</h2>
          <TopRatedTVSeriesCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>        
          <h2>Popular Tv Series:</h2>
          <PopularTVSeriesCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>        
          <h2>On The Air Tv Series:</h2>
          <OnTheAirTVSeriesCarousel />
        </div>
        <Divider style={{ borderColor: 'red' , width: '50px'}} />
        <div>
          <TVCarousel />
        </div>
      </div>
      <div className='footer_section'>
        <Footer />
      </div>
    </div>

  )
}
