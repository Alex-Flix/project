import { useEffect } from "react";
import { MovieCard } from "../../components/Streaming Components/MovieCard component/MovieCard";
import "../../components/Streaming Components/StreamPagesStyles/favorites.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllFav } from "../../store/Slice/videosSlice";
export default function Favorites() {
  const dispatch = useDispatch();
  const allVids = useSelector((state) => state.videos);
  const favorites = [...allVids.favorites];
  useEffect(() => {
    dispatch(getAllFav());
  }, []);
  return (
    <div id="favorites" className="my-3">
      <h1 className="text-center text-light mb-3">Favorites</h1>
      <h3
          className={`text-center text-capitalize text-light ${
            favorites.length === 0 ? "" : "d-none"
          }`}
        >
          no favorites yet !
        </h3>
      <div className="favorite-cards row justify-content-center w-100 m-0 p-2">
        {favorites.map((movie) => {
          let movieObj = {
            _id:movie.id,
            name:movie.name,
            poster_image:movie.poster
          };
          return <MovieCard movie={movieObj} key={movie.id} isFav={true} type={`video`} />;
        })}
      </div>
    </div>
  );
}
