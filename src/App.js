import {React, useEffect, useState} from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`

const App = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        console.log(data.Search)
        setMovies(data.Search)
    };

    useEffect(() => {
        searchMovies('Avenger');
    },[]);

    return (
        <div className="app">
            <h1>MovieHub</h1>
            <div className="search">
                <input placeholder="Search for movies"
                        value={searchTerm}
                        onChange={(e)=>{setSearchTerm(e.target.value)}}
                        onKeyDown={(e)=>{if(e.key==='Enter'){searchMovies(searchTerm)}}} />

                <img src={SearchIcon} alt="search"
                        onClick={()=>{searchMovies(searchTerm)}}/>
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                 <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}

        </div>
    );
}

export default App;