import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Movies from "./pages/Movies/Movies";
import Actor from "./pages/Actor/Actor";
import WatchListPage from "./pages/WatchLists/WatchListPage";
import Login from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/RegisterPage";
import { useSelector } from "react-redux";

function App() {
  const [watchlist, setWatchList] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  async function getWatchList() {
    const response = await fetch(`http://localhost:3000/watchlist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const watchlist = await response.json();
    setWatchList(watchlist);
  }
  useEffect(() => {
    getWatchList();
  }, [accessToken]);

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
      <Route
        path="/watchLists"
        element={<WatchListPage movies={watchlist} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
