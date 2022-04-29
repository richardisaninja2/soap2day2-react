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
    const {newMovies} = useContext(MovieContext);
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

    
        if(popularMovies.length < 1){
            return(
                <div>
                    loading data
                </div>
            )
        }
        let text = String.fromCodePoint(parseInt("2B50",16));

        return(
            <div className="container">
                
                <div>
                    <NewMovies setOfMovies={popularMovies} title="Popular Movies"/>
                    <NewMovies setOfMovies={newMovies} title="New Movies"/>
                    <AllMovies/>
                </div>
            </div>    
        )
        
   
}
export default Movies;