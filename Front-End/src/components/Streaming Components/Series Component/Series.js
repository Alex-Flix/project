import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSeries } from "../../../store/Slice/videosSlice";
import { Videos } from "../../Streaming Components/Videos Component/Videos";

export default function Series() {
  const allVids = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  let series = { ...allVids }.series;

  useEffect(() => {
    dispatch(fetchAllSeries());
  }, []);

  //Loader till the data arrive
  if (allVids.length === 0)
    return (
      <h1 className="w-100 h-100 text-light d-flex justify-content-center align-items-center">
        Loading....
      </h1>
    );

  return <Videos videos={series} type={"series"} />;
}
