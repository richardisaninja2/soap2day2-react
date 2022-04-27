import React from "react";
import SidePanel from "../sidePanel/SidePanel";
import { Link } from "react-router-dom";
import Movies from "../movies/Movies";

function NavBar(){
return(
    <div>
    <div className="navBar">
        <Link to="/"><div><h2>Clips</h2></div></Link>
        <div>
            <Link to="/allMovies"><h4>Movies</h4></Link>
            
            <h4>TV Shows</h4>
        </div>
        
    </div>
    </div>  
)
}

export default NavBar;