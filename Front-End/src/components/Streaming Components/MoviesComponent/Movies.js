import "./movies.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../../store/Slice/videosSlice";
import { Videos } from "../Videos Component/Videos";

export default function Movies() {
  const allVids = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  let movies = { ...allVids }.movies;

  useEffect(() => {
    if (movies?.length === 0) dispatch(fetchAllMovies());
  }, []);

  return <Videos videos={movies} type={"movie"} />;
}
