import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Movies from "./pages/Movies/Movies";
import Actor from "./pages/Actor/Actor";
import WatchListPage from "./pages/WatchLists/WatchListPage";

function App() {
  const [watchlist, setWatchList] = useState([]);
  async function getWatchList() {
    const response = await fetch(`http://localhost:3000/watchlist?userId=2`);
    const watchlist = await response.json();
    setWatchList(watchlist);
  }
  console.log(watchlist);
  useEffect(() => {
    getWatchList();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route
        path="/movies/:id"
        element={
          <MovieDetails watchlist={watchlist} getWatchList={getWatchList} />
        }
      />
      <Route path="/actors/:id" element={<Actor />} />
      <Route path="/watchLists" element={<WatchListPage movies={watchlist} />} />
    </Routes>
  );
}

export default App;
