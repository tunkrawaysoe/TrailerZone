import { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Movies from "./pages/Movies/Movies";
import Actor from "./pages/Actor/Actor";
import WatchListPage from "./pages/WatchLists/WatchListPage";
import Login from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchList } from "./redux/watchListSlice";
import { fetchRefreshToken } from "./redux/authSlice";

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRefreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchWatchList(accessToken));
  }, [accessToken, dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/actors/:id" element={<Actor />} />
      <Route path="/watchLists" element={<WatchListPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
