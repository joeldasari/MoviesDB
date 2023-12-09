import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BaseURL = "https://image.tmdb.org/t/p/w500";

export const MovieDisplay = () => {
  const { movieID } = useParams();
  const ID = parseInt(movieID, 10);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${
            import.meta.env.VITE_TMDB
          }&append_to_response=videos`
        );
        setMovie(result.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, []);
  return (
    <div className="flex items-center flex-col p-10">
      {!loading ? (
        <div className="w-[65vw] flex flex-col items-center gap-5 max-sm:w-[70vw]">
          <img
            src={`${BaseURL}${movie.poster_path}`}
            alt={movie.title}
            className="h-[400px] w-[270px] rounded-lg"
          />
          <div className="space-y-1">
            {/* title */}
            <p className="text-2xl font-bold my-1">
              {movie.title} ({movie.release_date?.substring(0, 4)})
            </p>
            {/* overview */}
            <div>{movie.overview}</div>
            {/* adult  */}
            <div>
              <span className="font-bold">Adult: </span>
              {movie.adult === false ? <span>No</span> : <span>Yes</span>}
            </div>
            {/* language  */}
            <div>
              <span className="font-bold">Language: </span>
              <span>{movie.original_language}</span>
            </div>
            {/* Release Date  */}
            <div>
              <span className="font-bold">Release Date: </span>
              <span>{movie.release_date}</span>
            </div>
            {/* Budget  */}
            <div>
              <span className="font-bold">Budget: </span>
              <span>{movie.budget === 0 ? "N/A" : "$" + movie.budget}</span>
            </div>
            {/* Revenue  */}
            <div>
              <span className="font-bold">Box Office: </span>
              <span>{movie.revenue === 0 ? "N/A" : "$" + movie.revenue}</span>
            </div>
            {/* generes */}
            <div>
              <span className="font-bold">Genres: </span>
              {movie.genres?.map((item, index) => (
                <span>
                  {item.name}
                  {index < movie.genres?.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
            {/* runtime  */}
            <div>
              <span className="font-bold">Runtime: </span>
              <span>{movie.runtime} min</span>
            </div>
            {/* rating */}
            <div>
              <span className="font-bold">Rating: </span>
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
            {/* ytlinks */}
            <div>
              {movie.videos?.results.length != 0 && (
                <span className="font-bold">Video Links: </span>
              )}
              {movie.videos?.results?.map((item) => (
                <div className="mb-2">
                  <Link
                    to={`https://www.youtube.com/watch?v=${item.key}`}
                    className="hover:text-blue-500"
                    target="_blank"
                  >
                    [{item.name}]
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
