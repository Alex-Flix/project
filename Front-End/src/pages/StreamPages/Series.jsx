import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSeries } from "../../store/Slice/videosSlice";
import  Videos  from "../../components/Streaming Components/Videos Component/Videos";

export default function Series() {
  const allVids = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  let series = { ...allVids }.series;

  useEffect(() => {
    if (series?.length === 0) dispatch(fetchAllSeries());
  }, []);

  return <Videos videos={series} type={"series"} />;
}
