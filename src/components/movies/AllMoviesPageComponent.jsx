import React, {useState, useEffect, useContext } from "react";
import SingleMovie from "./SingleMovie";
import {MovieContext} from "../../context/MovieContext";

function AllMoviesPageComponent(){
    const {filterMovies} = useContext(MovieContext)
    console.log(filterMovies)
    const {sampleSizeOmdbWebsite} = useContext(MovieContext);
    const {newMovies} = useContext(MovieContext);
    const {test} = useContext(MovieContext)
    const [showComponent, setShowComponent] = useState(false);
    const {isLoading} = useContext(MovieContext)
    const [moviesShowing, setMoviesShowing] = useState(sampleSizeOmdbWebsite)
    // const [showCOmponent, setShowComponent] = useState(0)

    let moviesFilteredArray = filterMovies ? filterMovies : ['all'];
    
    if(moviesFilteredArray.length > 7){
        moviesFilteredArray = filterMovies.split(",")
    }
     
    //lets you filter on the movie based on what is selected in the sidebar filter bubble
    //fix starting point of filter later
    let filter  = sampleSizeOmdbWebsite.filter(function(item) {
        let split;
        if(typeof item.Genre == "string" ){
        split = item.Genre.split(", ");
            let g;
        for(let i = 0; i<split.length; i++){
            if(moviesFilteredArray.indexOf(item.Title) !== "T" && typeof item.Genre == "string" && moviesFilteredArray.includes(split[i].toLowerCase())){
                    g =  moviesFilteredArray.indexOf(item.Title) !== "T" && typeof item.Genre == "string" && moviesFilteredArray.includes(split[i].toLowerCase()); 
            }if(moviesFilteredArray[i] == "all"){
                g = item;
            }
            }
            return g
        }
    })
        
    
    
     

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
            <div className="container">
                <h3>All Movies... see more</h3>
                <div className="allMovieContainer movie" >
                
                    
                    
                {filter.map((movie, index) => {
                    if(movie.Response == 'False'){
                        
                    }else{
                        return(
                        
                        <div key={index}>

                            
                            
                            <div className="allMovieComponentMovies"  style={{ backgroundImage: `url(${movie.Poster})`}} onClick={() => setShowComponent(index)} alt={movie.title}>
                                
            
                                {/* <video controls src={movie.movieLink}></video> */}
                            </div>

                            <div className="allMovieComponentLargeMoviesContainer">
                                <div className="allMovieComponentLargeMovies"  style={{ backgroundImage: `url(${movie.poster})`}} onClick={() => setShowComponent(index)} alt={movie.title}>
                                    {showComponent === index && <SingleMovie movie={movie} sampleSizeOmdbWebsite={sampleSizeOmdbWebsite}/>}
                
                                    {/* <video controls src={movie.movieLink}></video> */}
                                </div>
                                <div className="largeMovieInfo">
                                    <a href={movie.movieLink}><div className="play-button"></div></a>
                                    <div>{movie.Rated}, {movie.Runtime}</div>
                                    <div>{movie.Genre}</div>
                                    
                                </div>
                            </div>
                        </div>

                        )
                    }      
                })}
                </div>    
            </div>    
        )
}
export default AllMoviesPageComponent;