import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const BaseURL = "https://image.tmdb.org/t/p/w500";
export const TvDisplay = () => {
  const { tvID } = useParams();
  const ID = parseInt(tvID, 10);
  const [tv, setTv] = useState({});
  const [loading, setLoading] = useState(false);
  const [ytLink, setYtLink] = useState("");
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://api.themoviedb.org/3/tv/${ID}?api_key=${
            import.meta.env.VITE_TMDB
          }&append_to_response=videos`
        );
        setTv(result.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTvShows();
  }, []);
  return (
    <div className="flex items-center flex-col p-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-[65vw] flex gap-5 max-sm:flex-col max-sm:overflow-x-hidden">
          <img
            src={`${BaseURL}${tv.poster_path}`}
            alt={tv.name}
            className="h-[400px] w-[270px] rounded-lg"
          />
          <div className="space-y-1">
            {/* title */}
            <span className="text-2xl font-bold my-1">
              {tv.name} ({tv.first_air_date?.substring(0, 4)})
            </span>

            {/* overview */}
            <div>{tv.overview}</div>
            {/* adult  */}
            <div>
              <span className="font-bold">Adult: </span>
              {tv.adult === false ? <span>No</span> : <span>Yes</span>}
            </div>
            {/* language  */}
            <div>
              <span className="font-bold">Language: </span>
              <span>{tv.original_language}</span>
            </div>
            {/* first_air_date  */}
            <div>
              <span className="font-bold">First Air Date: </span>
              <span>{tv.first_air_date}</span>
            </div>
            {/* last_air_date */}
            <div>
              <span className="font-bold">Last Air Date: </span>
              <span>{tv.last_air_date}</span>
            </div>
            {/* Total Seasons */}
            <div>
              <span className="font-bold">Total Seasons: </span>
              <span>{tv.number_of_seasons}</span>
            </div>
            {/* Total Episodes */}
            <div>
              <span className="font-bold">Total Episodes: </span>
              <span>{tv.number_of_episodes}</span>
            </div>
            {/* generes */}
            <div>
              <span className="font-bold">Genres: </span>
              {tv.genres?.map((item, index) => (
                <span>
                  {item.name}
                  {index < tv.genres?.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
            {/* ytlinks */}
            <div>
              {tv.videos?.results.length != 0 && (
                <span className="font-bold">Video Links: </span>
              )}
              {tv.videos?.results?.map((item) => (
                <Link
                  to={`https://www.youtube.com/watch?v=${item.key}`}
                  className=" hover:text-blue-500"
                  target="_blank"
                >
                  [{item.type}]
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
