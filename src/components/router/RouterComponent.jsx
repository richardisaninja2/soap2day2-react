import React,{useContext, useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMoviesPageComponent from "../movies/AllMoviesPageComponent";
import Movies from "../movies/Movies";
import { MovieContext } from "../../context/MovieContext";
import PopularMoviesComponent from "../movies/PopularMoviesComponent";
import SingleMovie from "../movies/SingleMovie";
import NavBar from "../navBar/NavBar";
import SidePanel from "../sidePanel/SidePanel";

function RouterComponent(){
  const {popularMovies} = useContext(MovieContext);
  const {newMovies} = useContext(MovieContext);
  const {moviesSidebar} = useContext(MovieContext);
  const allMovies = newMovies.concat(popularMovies);
  

  useEffect(() => {

  }, [])
    return(
    <BrowserRouter>
    <NavBar/>
    <SidePanel/>
      <Routes>
          <Route path="/" element={<Movies/>}/>
          <Route path="/popularMovies" element={<PopularMoviesComponent popularMovies={popularMovies}/>}/>
          <Route path="/newMovies" element={<PopularMoviesComponent popularMovies={newMovies}/>}/>
          <Route path="/bookmarkedMovies" element={<PopularMoviesComponent popularMovies={moviesSidebar}/>}/>
          <Route path="/allMovies" element={<PopularMoviesComponent popularMovies={allMovies}/>}/>
      </Routes>
    </BrowserRouter>
    )
}
export default RouterComponent;