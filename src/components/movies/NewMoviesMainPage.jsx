import React, {useState, useEffect, useContext, useRef } from "react";
import SingleMovie from "./SingleMovie";
import {MovieContext} from "../../context/MovieContext";
import { Link } from "react-router-dom";

function NewMovies () {
    
    const ref = useRef(null)
    const {sampleSizeOmdbWebsite} = useContext(MovieContext);
    const {popularMovies} = useContext(MovieContext);
    const {test} = useContext(MovieContext)
    const {newMovies} = useContext(MovieContext)
    const [showComponent, setShowComponent] = useState(false);
    const {isLoading} = useContext(MovieContext)
    // const [showCOmponent, setShowComponent] = useState(0)

     
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset; 
    }
    
     

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
        return(
            <div>
                <Link to="/newMovies"><h3>New Movies</h3></Link>

                <div className="scrollLeft" onClick={() => scroll(-1000)}>
                    <div className="lightBackground"> </div>
                    <div className="movieText">&lsaquo;</div>
                </div>

                <div className="scrollRight" onClick={() => scroll(1000)}>
                    <div className="lightBackground"> </div>
                    <div className="movieText">&rsaquo;</div>
                </div>

                <div className="movieContainer movie" ref={ref}>  
                {newMovies.sort((a,b) => b.imdbRating.localeCompare(a.imdbRating)).map((movie, index) => {
               
                    if(movie.response != 'False' && movie.imdbRating != "N/A" && movie.poster != "N/A"){
                       return(
                        
                        <div key={index}>
                            
                            <div className="movies"  style={{ backgroundImage: `url(${movie.poster})`}} onClick={() => setShowComponent(index)} alt={movie.title}>
                                {showComponent === index && <SingleMovie movie={movie} sampleSizeOmdbWebsite={popularMovies}/>}
                                    <div className="imdbRating">
                                            {movie.imdbRating}
                                    </div>
                                {/* <video controls src={movie.movieLink}></video> */}
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