import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BaseURL = "https://image.tmdb.org/t/p/w500";
export const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_TMDB
          }`
        );
        setMovies(result.data.results);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <div className="w-full flex flex-wrap justify-center gap-4">
        {movies.map((movie) => {
          return (
            <div className="h-[500px] w-[270px] max-sm:h-[450px]">
              <Link to={`moviedisplay/${movie.id}`}>
                <img
                  src={`${BaseURL}${movie.poster_path}`}
                  alt={movie.original_title}
                  className="h-[400px] w-[270px] rounded-lg hover:cursor-pointer hover:brightness-75"
                />
              </Link>
              <Link to={`moviedisplay/${movie.id}`}>
                <p className=" mt-1 text-sm font-bold hover:text-blue-500 hover:cursor-pointer">
                  {movie.title} ({movie.release_date.substring(0, 4)})
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
