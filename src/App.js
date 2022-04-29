import logo from './logo.svg';
import './App.scss';
import NavBar from './components/navBar/NavBar';
import Movies from './components/movies/Movies';
import {MovieContext} from './context/MovieContext';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SidePanel from './components/sidePanel/SidePanel';
import NewMovies from './components/movies/NewMoviesMainPage';
import AllMovies from './components/movies/AllMoviesMainPage';
import RouterComponent from './components/router/RouterComponent';


function App() {
  const [javaMovies, setJavaMovies] = useState([]);
  const [moviesSidebar, setMoviesSidebar] = useState([]);
  const [bookmarkClickUpdate, setBookmarkClickUpdate] = useState(0);
    const[movieSampleSize, setMovieSampleSize] = useState([]);
    const [bookmarksLength, setBookmarksLength] = useState();
    const [sampleSizeOmdbWebsite, setSampleSizeOmdbWebsite] = useState([])
    const [popularMovies, setPopularMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [test, setTest] = useState(false);
    const[reload, setReload] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const allMovies = newMovies.concat(popularMovies);
    //get popular movies from database
    async function getPopularMovies () {
      await axios.get("https://soap2day2-backend.herokuapp.com/listPopularMovies")
      .then(movies => {
        setPopularMovies(movies.data);
        setTest(true)
      })
    }
    async function getNewMovies () {
      await axios.get("https://soap2day2-backend.herokuapp.com/getNewMovies")
      .then(movies => {
        setNewMovies(movies.data)
        setReload(true)
      })
      
    }

    // const getMovies = () => {
    //     axios.get("http://localhost:8080/getAll")
    //     .then(movies => {
            
    //         setJavaMovies(movies.data)
    //         setMovieSampleSize(movies.data.slice(0, 21));           
    //     })
    // } 
     
    useEffect(() => {
        // getMovies()

        getPopularMovies()
        getNewMovies();
        console.log(popularMovies)
        async function getDataFromOmdb () {
            const sampleSizeOmdb = [];
        for(let i = 0; i<movieSampleSize.length; i++){
             const movie  = movieSampleSize[i].title.replace(/\s/g, '+');
             const year = movieSampleSize[i].movieDate;
            await axios.get(`http://www.omdbapi.com/?apikey=a81836fb&t=${movie}&y=${year}`)
            .then(movies => {
              sampleSizeOmdb.push({
                  ...movies.data, movieLink: movieSampleSize[i].movieLink,
                  year: movieSampleSize[i].movieDate
              })
            })
        }
            setSampleSizeOmdbWebsite(sampleSizeOmdb);
            setIsLoading(false);
        }
     
         getDataFromOmdb()
    }, [test, isLoading, reload]) 

    const showComponentFunc = () => {
      setShowComponent(0);  
    }

  const [filterMovies, setFilterMovies] = useState();

  return (
    <div>
      <MovieContext.Provider value={{javaMovies, movieSampleSize, sampleSizeOmdbWebsite, test, showComponent, isLoading, filterMovies, popularMovies, newMovies, bookmarksLength, setBookmarksLength, reload, bookmarkClickUpdate, setBookmarkClickUpdate, moviesSidebar, setMoviesSidebar, setFilterMovies, allMovies}}>
      <div className="">
        <RouterComponent>
            <SidePanel/>
        </RouterComponent>
        
        

        

      </div>
    </MovieContext.Provider>
    </div>
    
  );
}

export default App;
