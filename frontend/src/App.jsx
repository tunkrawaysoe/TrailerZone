import { useEffect } from "react";
import Home from "./pages/client/Home/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/client/MovieDetails/MovieDetails";
import Movies from "./pages/client/Movies/Movies";
import Actor from "./pages/client/Actor/Actor";
import WatchListPage from "./pages/client/WatchLists/WatchListPage";
import Login from "./Auth/Login";
import RegisterPage from "./Auth/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchList } from "./redux/watchListSlice";
import { fetchRefreshToken } from "./redux/authSlice";
import ProfilePage from "./pages/client/Profile/ProfilePage";
import ProfileEditPage from "./pages/client/Profile/ProfileEditPage";
import DashboardPage from "./pages/admin/Dashboard/DashboardPage";
import AdminLayout from "./pages/admin/AdminLayout";

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
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<ProfileEditPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
