import "./movies.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../../store/Slice/videosSlice";
import { Videos } from "../../Streaming Components/Videos Component/Videos";

export default function Movies() {
  const allVids = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  let movies = {...allVids}.movies
    
  useEffect(() => {
    dispatch(fetchAllMovies());
  },[]);

//Loader till the data arrive
if (movies.length === 0)
return (
  <h1 className="w-100 h-100 text-light d-flex justify-content-center align-items-center">
    Loading....
  </h1>
);

  return <Videos videos={movies} type={"movie"} />;
}
