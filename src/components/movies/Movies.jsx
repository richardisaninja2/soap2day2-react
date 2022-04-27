import React, {useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Html5Entities } from 'html-entities'; 
import SingleMovie from "./SingleMovie";
import {MovieContext} from "../../context/MovieContext";
import NewMovies from "./NewMoviesMainPage";
import AllMovies from "./AllMoviesMainPage";

function Movies(){
    

    const {sampleSizeOmdbWebsite} = useContext(MovieContext);
    const {popularMovies} = useContext(MovieContext);
    const [showComponent, setShowComponent] = useState(false);
    // const [showCOmponent, setShowComponent] = useState(0)
    const ref = useRef(null)
    // function getHighRatedMovies(movie){
            
    //         return movie.imdbRating > 7;
            
    // }

    //shuffle the top movies in random order
//    const shuffled = sampleSizeOmdbWebsite
//   .map(value => ({ value, sort: Math.random() }))
//   .sort((a, b) => a.sort - b.sort)
//   .map(({ value }) => value)



    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset; 
    }

 

    useEffect( () => {
        console.log(popularMovies)
    
    }, [])
    
    const showComponentFunc = () => {
      setShowComponent(0);  
    }

    
        if(sampleSizeOmdbWebsite.length < 1){
            return(
                <div>
                    loading data
                </div>
            )
        }
        let text = String.fromCodePoint(parseInt("2B50",16));

        return(
            <div className="container">
                <Link to="/popularmovies"><h3>Popular Movies </h3></Link>

                <div className="scrollLeft" onClick={() => scroll(-1000)}>
                    <div className="lightBackground"> </div>
                    <div className="movieText">&lsaquo;</div>
                </div>

                <div className="scrollRight" onClick={() => scroll(1000)}>
                    <div className="lightBackground"> </div>
                    <div className="movieText">&rsaquo;</div>
                </div>

                <div className="movieContainer movie" ref={ref}>
                    
                    {/* {console.log(sampleSizeOmdbWebsite)} */}
                    {/* filtering on movies that are rated over 5 on imdb */}
                    {/* shuffled.filter(getHighRatedMovies) */}
                {popularMovies.sort((a,b) => b.imdbRating.localeCompare(a.imdbRating)).map((movie, index) => {
                    if(movie.response != 'False' && movie.imdbRating != "N/A" && movie.poster != "N/A"){
                         return(
                        
                        <div className="homepageMovieContainerDiv" key={index}>
                            
                            <div className="movies"  style={{ backgroundImage: `url(${movie.poster})`}} onClick={() => setShowComponent(index)} alt={movie.Title}>
                                {showComponent === index && <SingleMovie movie={movie} sampleSizeOmdbWebsite={popularMovies}/>}
                                    <div className="imdbRating">
                                        {movie.imdbRating}
                                    </div>
                                
                                {/* <video controls src={movie.movieLink}></video> */}
                            </div>
                            <div className="movieHomepageInfo">
                                <span>{movie.title}</span><br/>
                                {}
                                {text.repeat(parseFloat(movie.imdbRating/2))} <br/>
                                {movie.year}<br/>
                                {movie.genre}
                            </div>
                        </div>
                        )
                    }else{
                       
                    }      
                })}
                </div>
                <div>
                    <NewMovies/>
                    <AllMovies/>
                </div>
            </div>    
        )
        
   
}
export default Movies;