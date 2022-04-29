import React, {useState, useEffect, useContext } from "react";
import SingleMovie from "./SingleMovie";
import {MovieContext} from "../../context/MovieContext";
import { Link } from "react-router-dom";

function AllMovies() {
    const {filterMovies} = useContext(MovieContext)
    const {setBookmarkClickUpdate} = useContext(MovieContext)
    const {sampleSizeOmdbWebsite} = useContext(MovieContext);
    const {newMovies} = useContext(MovieContext)
    const {setBookmarksLength} = useContext(MovieContext)
    const {test} = useContext(MovieContext)
    const [showComponent, setShowComponent] = useState(false);
    let bookmark = [];
    const [Bookmarks, setBookmarks] = useState()
    const [bookmarkCount, setBookmarkCount] = useState(0);
    // const [showCOmponent, setShowComponent] = useState(0)
    let moviesFilteredArray = filterMovies ? filterMovies : ['all'];
    
    if(moviesFilteredArray.length > 7){
        moviesFilteredArray = filterMovies.split(",")
    }
     
    //lets you filter on the movie based on what is selected in the sidebar filter bubble
    //fix starting point of filter later
    let filter  = newMovies.filter(function(item) {
        let split;
        if(typeof item.genre == "string" ){
        split = item.genre.split(", ");
            let g;
        for(let i = 0; i<split.length; i++){
            if(moviesFilteredArray.indexOf(item.title) !== "T" && typeof item.genre == "string" && moviesFilteredArray.includes(split[i].toLowerCase())){
                    g =  moviesFilteredArray.indexOf(item.title) !== "T" && typeof item.genre == "string" && moviesFilteredArray.includes(split[i].toLowerCase()); 
            }if(moviesFilteredArray[i] == "all"){
                g = item;
            }
            }
            return g
        }
    })

    // const incrementBookmark = () => {
    //     setBookmarkCount(bookmarkCount + 1);
    // }
        
    
    
     

    const showComponentFunc = () => {
      setShowComponent(0);  
    }
   
    function AddToBookmarks (movieName) {
        let answers = JSON.parse(localStorage.getItem("movie"));
        console.log(typeof answers)
        if(localStorage.getItem('movie') && answers.includes(movieName)){
            let index = answers.indexOf(movieName);
            if (index > -1) {
                answers.splice(index, 1); // 2nd parameter means remove one item only
              }
              
            localStorage.setItem("movie", JSON.stringify(answers)) 
        }
        else{
            
            bookmark.push(movieName);
        console.log(`bookmark ${bookmark}`)
        //after the page reloads and bookmark is set back to 0
        if(localStorage.getItem('movie') && bookmark.length == 1){
            
          let answers = JSON.parse(localStorage.getItem("movie"));
        //   console.log(answers)
          for(let i = 0; i<answers.length; i++){
              bookmark.push(answers[i])
          }
          localStorage.setItem("movie", JSON.stringify(bookmark))   
        }
        //add to localstorage   
        else{
            localStorage.setItem("movie", JSON.stringify(bookmark)) 
        }  
        }
        setBookmarksLength(bookmark.length);
        setBookmarkCount(bookmarkCount + 1)
        setBookmarkClickUpdate(bookmarkCount);
        // console.log(`increment ${bookmarkCount}`);
        // console.log(`bookmark ${bookmark.length}`)  
    }
    

    useState(() => {
    },[[],bookmark.length, bookmarkCount])



        if(newMovies.length < 1){
            return(
                <div>
                    loading data
                </div>
            )
        }
        return(
            <div>
                <Link to="/allMovies"><h3 className="allMoviesHeading">All Movies... see more</h3></Link>
                <div className="allMovieContainer movie" >
                
                    
                    
                {filter.map((movie, index) => {
                    if(movie.Response == 'False'){
                        
                    }else{
                        if(movie.response != 'False' && movie.imdbRating != "N/A" && movie.poster != "N/A"){
                        return(
                        
                        <div key={index} className="allMoviesContainer">

                            
                            {/* small movie thumbnail */}
                            <div className="allMovieComponentMovies"  style={{ backgroundImage: `url(${movie.poster})`}} onClick={() => setShowComponent(index)} alt={movie.title}>
                                <div className="imdbRating">{movie.imdbRating}</div>
                                {/* <video controls src={movie.movieLink}></video> */}
                                
                            </div>

                            <div className="allMovieComponentLargeMoviesContainer">
                                <div className="allMovieComponentLargeMovies"  style={{ backgroundImage: `url(${movie.poster})`}} onClick={() => setShowComponent(index)} alt={movie.title}>
                                    {showComponent === index && <SingleMovie movie={movie} sampleSizeOmdbWebsite={filter}/>}
                                        <div className="imdbRating">
                                            {movie.imdbRating}
                                        </div>

                                    {/* <video controls src={movie.movieLink}></video> */}
                                </div>
                                <div className="largeMovieInfo">
                                        <svg onClick={() => {AddToBookmarks(movie.title) }} className="allMoviesSvg play-button" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path>
                                        </svg>
                                    {/* <a href={movie.movieLink}><div className="play-button"></div></a> */}
                                    <div>imdb: {movie.imdbRating}</div>
                                    <div>{movie.rated}, {movie.runtime}</div>
                                    <div>{movie.genre}</div>


                                    {/* <div onClick={() => {AddToBookmarks(movie.title); }} className="likes">add</div> */}
                                   
                                    
                                </div>
                            </div>
                        </div>

                        )
                                }
                    }      
                })}
                </div>    
            </div>    
        )
}

export default AllMovies;