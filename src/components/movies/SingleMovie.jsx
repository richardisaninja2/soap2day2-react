import React, {useState, useRef} from "react";

const  SingleMovie = ({movie, sampleSizeOmdbWebsite}) => {
 const [showComponent, setShowComponent] = useState(false);
 const [style, setStyle] = useState("block");
const ref = useRef(false);
    const onClickStyle = () => {
       setStyle("none")
       setShowComponent(0)
    }
 
    return(
        <div>
            <div className="singleMovieDivContainer" style={{display: style}}></div>
            
            <div className="singleMovieDivContainer" style={{display: style}}>
                <div onClick={() => onClickStyle()} className="close">|back|</div>
                <div className="singleMovieDiv">
                    
                    <div className="moviePoster" style={{ backgroundImage: `url(${movie.poster})`, backgroundPosition: `center`}}></div>
                    <div className="movieInfo"> 
                        <div>
                            <h2>{movie.title}</h2>
                            <span>{movie.year} {movie.rated} {movie.runtime} </span>
                            <p>{movie.plot}</p>
                        </div>
                        
                        <div>
                            <p><span className="gray" style={{color: "#676C80"}}>Cast:</span> {movie.actors}</p>
                            <p><span className="gray" style={{color: "#676C80"}}>Genre:</span> {movie.genre}</p>
                            <p><span className="gray" style={{color: "#676C80"}}>Imdb Rating</span> {movie.imdbRating}</p>
                        </div>
                        
                        
                    </div>

                    <div className="movieContainer movie">
                        {sampleSizeOmdbWebsite.map((movies, index) => {
                            if(movies.Response != "False"){
                            const movieGenre = movie.genre.split(" ");
                           let number = "";
                            //reccommended movie from category... only return 6
                            if(movies.genre?.toLowerCase().includes(movieGenre[0].substring(0, movieGenre[0].length - 1).toLowerCase())){
                                number += 1;
                                return(
                                <div className="recommendedMovies" key={index} style={{ backgroundImage: `url(${movies.poster})`, backgroundSize: `cover`, backgroundPosition: `center`}} onClick={() => {setShowComponent(index)}}  alt={movies.Title}>
                                    {showComponent === index && <SingleMovie movie={movies} sampleSizeOmdbWebsite={sampleSizeOmdbWebsite}/>}
                                    {index}
                                    {/* <video controls src={movie.movieLink}></video> */}
                                    
                                </div>
                                )
                            }
                           
                            }else if(movies.Response == "False"){
                                return(
                                    <div></div>
                                )
                            }
                        })}
                    </div>

                    
                </div>
                
            </div>
        </div>
       
    )
}
export default SingleMovie;