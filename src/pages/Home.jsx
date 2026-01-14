import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import '../css/Home.css';
import { getPopularMovies, searchMovies } from "../services/api";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (searchQuery.trim() !== "" && !loading) {
            setLoading(true);

            try {
                const filteredMovies = await searchMovies(searchQuery);
                setMovies(filteredMovies);
                setError(null);
            } catch (error) {
                console.log("Error searching movies:", error);
                setError('Failed to search movies');
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchAndSetPopularMovies();
    }, []);

    const fetchAndSetPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } catch (error) {
            console.error("Error fetching popular movies:", error);
            setError('Failed to load movies');
        } finally {
            setLoading(false);
        }
    }

    return <div className="home">
        {error && <div className="error-message">{error}</div>}
        {loading ?
            <div className="loading">Loading...</div> :
            <>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </>}
    </div>;
}
