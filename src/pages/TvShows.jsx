import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BaseURL = "https://image.tmdb.org/t/p/w500";
export const TvShows = () => {
  const [tv, setTv] = useState([]);
  useEffect(() => {
    const fetchTvShows = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          import.meta.env.VITE_TMDB
        }`
      );
      setTv(result.data.results);
    };
    fetchTvShows();
  }, []);
  return (
    <div className="w-full flex justify-center flex-wrap gap-4">
      {tv.map((show) => {
        return (
          <div className="h-[500px] w-[270px] max-sm:h-[450px]">
            <Link to={`/tvdisplay/${show.id}`}>
              <img
                src={`${BaseURL}${show.poster_path}`}
                alt={show.name}
                className="h-[400px] w-[270px] rounded-lg hover:cursor-pointer hover:brightness-75"
              />
            </Link>
            <Link to={`/tvdisplay/${show.id}`}>
              <p className=" mt-1 text-sm font-bold hover:text-blue-500 hover:cursor-pointer">
                {show.name} ({show.first_air_date?.substring(0, 4)})
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
