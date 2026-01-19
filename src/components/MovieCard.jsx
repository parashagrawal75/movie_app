import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';

export default function MovieCard({ movie }) {
    const { onFavoriteClick, isFavorite } = useMovieContext();
    const favorite = isFavorite(movie.id);

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={(e) => onFavoriteClick(e, movie)}>
                    Heart
                </button>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    </div>;
}
