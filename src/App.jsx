import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Movies } from "./pages/Movies";
import { TvShows } from "./pages/TvShows";
import { MovieDisplay } from "./pages/MovieDisplay";
import { TvDisplay } from "./pages/TvDisplay";
import { MovieOrTv } from "./components/MovieOrTv";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieOrTv />} />
          <Route path="/tv" element={<TvShows />} />
          <Route path="/moviedisplay/:movieID" element={<MovieDisplay />} />
          <Route path="/tvdisplay/:tvID" element={<TvDisplay />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
