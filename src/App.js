import React,{ useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import searchIcon from './search.svg';
import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=9e6b1b4f';
const MOVIE_NAMES = ['Avengers','Inception','SpiderMan','The Matrix','Interstellar','Nun'];


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const getRandomMovie = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * MOVIE_NAMES.length);
        return MOVIE_NAMES[randomIndex];
    }, []);
    const searchMovies = useCallback(async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }, []);
    useEffect(() => {
        searchMovies(getRandomMovie());
    }, [getRandomMovie, searchMovies]);
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} />
            </div>
            {
                movies?.length > 0 ?
                    (

                        <div className="container">
                            {movies.map((movie) => (<MovieCard key={movie.imdbID || movie.Title} movie={movie} />))}

                        </div>
                    ) :
                    (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )}

        </div>

    );
}

export default App;