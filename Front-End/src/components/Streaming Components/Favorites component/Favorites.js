import { MovieCard } from "../../Streaming Components/MovieCard component/MovieCard";
import "./favorites.css";
import { useSelector } from "react-redux";
export default function Favorites() {
  const favoriteMovies = useSelector((state) => state.favorites);
  return (
    <div id="favorites" className="">
      <h1 className="text-center text-light">Favorites !</h1>
      <div className="favorite-cards row justify-content-center">
        {favoriteMovies.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} isFav={true} />;
        })}
      </div>
    </div>
  );
}
