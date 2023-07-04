import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAnimes } from "../../store/Slice/videosSlice";
import Videos from "../../components/Streaming Components/Videos Component/Videos";

export default function Animes() {
  const allVids = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const animes = { ...allVids }.animes;

  useEffect(() => {
    if (animes?.length === 0) dispatch(fetchAllAnimes());
  }, []);

  return <Videos videos={animes} type={"anime"} />;
}
