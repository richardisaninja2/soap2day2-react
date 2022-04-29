import React, {useState, useEffect, useContext, useRef } from "react";
import SingleMovie from "./SingleMovie";
import {MovieContext} from "../../context/MovieContext";
import { Link } from "react-router-dom";

function NewMovies ({setOfMovies, title}) {
    
    const ref = useRef(null)
    const {sampleSizeOmdbWebsite} = useContext(MovieContext);
    const {popularMovies} = useContext(MovieContext);
    const [showComponent, setShowComponent] = useState(false);
    // const [showCOmponent, setShowComponent] = useState(0)

     
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset; 
    }
    
     

    const showComponentFunc = () => {
      setShowComponent(0);  
    }
   
    let text = String.fromCodePoint(parseInt("2B50",16));

        return(
            <div>
                <Link to="/newMovies"><h3>{title}</h3></Link>

                <div className="scrollLeft" onClick={() => scroll(-1000)}>
                    <div className="lightBackground"> </div>
                    <div className="movieText">&lsaquo;</div>
                </div>

                <div className="scrollRight" onClick={() => scroll(1000)}>
                    <div className="lightBackground"> </div>
                    <div className="movieText">&rsaquo;</div>
                </div>

                <div className="movieContainer movie" ref={ref}>  
                {setOfMovies.sort((a,b) => b.imdbRating.localeCompare(a.imdbRating)).map((movie, index) => {
               
                    if(movie.response != 'False' && movie.imdbRating != "N/A" && movie.poster != "N/A"){
                       return(
                        
                        <div className="homepageMovieContainerDiv" key={index}>
                            
                            <div className="movies"  style={{ backgroundImage: `url(${movie.poster})`}} onClick={() => setShowComponent(index)} alt={movie.title}>
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
                    }      
                })}
                </div>    
            </div>
                
        )
}
export default NewMovies;