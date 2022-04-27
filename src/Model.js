import { composeWithDevTools } from 'redux-devtools-extension';
import React, {useState, useEffect} from "react";
import axios from "axios";

function Model (){

    const [javaMovies, setJavaMovies] = useState([]);
    const[movieSampleSize, setMovieSampleSize] = useState([]);
    
    const [sampleSizeOmdbWebsite, setSampleSizeOmdbWebsite] = useState([])
    const [test, setTest] = useState("s")
    const [showComponent, setShowComponent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getMovies = () => {
        axios.get("http://localhost:8080/getAll")
        .then(movies => {
            
            setJavaMovies(movies.data)
            setMovieSampleSize(movies.data.slice(7, 14)); 
            setTest("true")
           
        })   
    }
     console.log(movieSampleSize);

    
     
    useEffect(() => {
        getMovies()

        async function getDataFromOmdb () {
            const sampleSizeOmdb = [];
        for(let i = 0; i<movieSampleSize.length; i++){
             const movie  = movieSampleSize[i].title.replace(/\s/g, '+');
             const year = movieSampleSize[i].movieDate;
            await axios.get(`http://www.omdbapi.com/?apikey=a81836fb&t=${movie}&y=${year}`)
            .then(movies => {
              sampleSizeOmdb.push({
                  ...movies.data, movieLink: movieSampleSize[i].movieLink,
                  year: movieSampleSize[i].movieDate
              })
            })
        }
            setSampleSizeOmdbWebsite(sampleSizeOmdb);
            setIsLoading(false);
            console.log(`it gets called`) 
        }
     
         getDataFromOmdb()
    }, [test, isLoading]) 

    const showComponentFunc = () => {
      setShowComponent(0);  
    }

}
export default Model;