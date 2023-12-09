import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BaseURL = "https://image.tmdb.org/t/p/w500";

export const MovieDisplay = () => {
  const { movieID } = useParams();
  const ID = parseInt(movieID, 10);
  const [movie, setMovie] = useState({});
  const [view, setView] = useState(false);
  const [omdb, setOmdb] = useState({});
  const [ytLink, setYtLink] = useState("");
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
  const viewMore = async (imdbID) => {
    try {
      setView(true);
      const result = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${
          import.meta.env.VITE_OMDB
        }`
      );
      setOmdb(result.data);
      movie.videos.results?.map((item) => {
        if (
          movie.videos.results?.length === 1 ||
          item.name === "Official Trailer" ||
          item.name === "Official Trailer (Greenband)"
        ) {
          setYtLink(item.key);
        }
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setView(false);
    }
  };
  return (
    <div className="flex items-center flex-col p-10">
      {!loading ? (
        <div className="w-[65vw] flex gap-5 max-sm:flex-col max-sm:overflow-x-hidden">
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
            {view ? (
              <p>Loading...</p>
            ) : omdb.Actors ? (
              <div>
                {/* actors */}
                <div>
                  <span className="font-bold">Actors: </span>
                  <span>{omdb.Actors}</span>
                </div>
                {/* director */}
                <div>
                  <span className="font-bold">Directed by: </span>
                  <span>{omdb.Director}</span>
                </div>
                {/* imdbRating */}
                <div>
                  <span className="font-bold">IMDB: </span>
                  <span>{omdb.imdbRating}</span>
                </div>
                {/* yt videolink  */}
                <div>
                  <span className="font-bold">Trailer: </span>
                  <Link
                    to={`https://www.youtube.com/watch?v=${ytLink}`}
                    className=" underline hover:text-blue-500"
                    target="_blank"
                  >
                    Youtube Link
                  </Link>
                </div>
              </div>
            ) : (
              <button
                className="p-2 text-sm text-white bg-blue-500 rounded-sm hover:bg-blue-600 active:bg-blue-800"
                onClick={() => viewMore(movie.imdb_id)}
              >
                View More
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
