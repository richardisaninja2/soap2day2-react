import React, {useContext, useEffect, useState} from "react";
import { MovieContext } from "../../context/MovieContext";
import { Link } from "react-router-dom";


function SidePanel() {
    const {setFilterMovies} = useContext(MovieContext)
    const [genre, setGenre] = useState({})
    const {setMoviesSidebar} = useContext(MovieContext);
    const {allMovies} = useContext(MovieContext);
    const {reload} = useContext(MovieContext);
    const {bookmarkClickUpdate} = useContext(MovieContext)
    const [refresh, setRefresh] = useState(false);
    let [filter, setFilter] = useState("");
    const {bookmarksLength} = useContext(MovieContext)
    const[moviesBookmarked, setMoviesBookmarked] = useState([]);

    const handleChange = (e) => {
        setGenre({
          ...genre,
         [e.target.name]: e.target.checked
        })     
    }

    let keys = Object.keys(genre)
    filter  = keys.filter(function(key){
        if(genre[key] == true){
            return genre[key].toString()
        }
    })

    const showBookmarks = () => {

        if(localStorage.getItem('movie')){
            let answers = JSON.parse(localStorage.getItem("movie"));
            setMoviesBookmarked(answers);
            //fix bug where movies only show up after there is more than 1

        } 
        
            
    }
    const [sidebarMovies, setSideBarMovies] = useState([]);

    


    useEffect(() => {

        console.log(` this is ${filter}`)
        setFilterMovies( filter.toString());
        showBookmarks();
         if(moviesBookmarked.length > 0){
             setSideBarMovies(allMovies.filter(element => moviesBookmarked.includes(element.title)))
             setMoviesSidebar(sidebarMovies)
             setRefresh(true) 
         }
        // console.log(`bookarked ${moviesBookmarked.length == 0}`) 
        // console.log(`reload ${sidebarMovies}`)
        setRefresh(true)
        // console.log(`click update ${sidebarMovies}`)

        
    },[ genre, bookmarksLength, moviesBookmarked.length, sidebarMovies.length, reload, refresh, bookmarkClickUpdate])

    return(
        <div>
            <div className="sidePanelContainer">
                <div className="search">
                    <form>
                        <input type="text" name="movie" placeholder="    Search Movies"></input>
                        <div>
                            <input type="checkbox" id="check_1" name="action" value="action" onClick={handleChange}/>
                            <label htmlFor="check_1">Action</label> 
                            
            

                            <input type="checkbox" id="check_2" name="adventure" value="check_2" onClick={handleChange}/>
                            <label htmlFor="check_2">Adventure</label>

                            <input type="checkbox" id="check_3" name="comedy" value="check_3" onClick={handleChange}/>
                            <label htmlFor="check_3">Comedy</label>

                            <input type="checkbox" id="check_4" name="crime" value="check_4" onClick={handleChange}/>
                            <label htmlFor="check_4">Crime</label>

                            <input type="checkbox" id="check_5" name="romance" value="check_5" onClick={handleChange}/>
                            <label htmlFor="check_5">Romance</label>

                            <input type="checkbox" id="horror" name="horror" value="horror" onClick={handleChange}/>
                            <label htmlFor="horror">Horror</label>

                            <input type="checkbox" id="drama" name="drama" value="drama" onClick={handleChange}/>
                            <label htmlFor="drama">Drama</label>

                            <input type="checkbox" id="scienceFic" name="scienceFic" value="scienceFid" onClick={handleChange}/>
                            <label htmlFor="scienceFic">ScienceFic</label>
                        </div>
                    </form>
                </div>

                <div className="bookmarked">
                    <Link to="/bookmarkedMovies"><h3 className="h3after">Bookmarked</h3></Link>
                    {sidebarMovies.slice(0,2).map((movie, index) => {   
                            
                          return(
                            <div  key={index} >
                                <div className="bookmarkedMovies" style={{ backgroundImage: `url(${movie.poster})`}}>

                                    <div className="bottom">
                                        <h3>{movie.title}</h3>
                                        {movie.year}
                                    </div>

                                </div>
                            </div>
                        )  
                        
                        }           
                    )}
                </div>
            </div>
        </div>
    )
}
export default SidePanel;