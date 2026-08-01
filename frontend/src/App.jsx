import Home from "./pages/client/Home/Home";
import MovieDetails from "./pages/client/MovieDetails/MovieDetailsPage";
import Movies from "./pages/client/Movies/Movies";
import Actor from "./pages/client/Actor/Actor";
import WatchListPage from "./pages/client/WatchLists/WatchListPage";
import Login from "./Auth/Login";
import RegisterPage from "./Auth/RegisterPage";
import ProfilePage from "./pages/client/Profile/ProfilePage";
import ProfileEditPage from "./pages/client/Profile/ProfileEditPage";
import DashboardPage from "./pages/admin/Dashboard/DashboardPage";
import AdminLayout from "./pages/admin/AdminLayout";
import ClientLayout from "./pages/client/ClientLayout";
import AdminMoviesPage from "./pages/admin/Movies/AdminMoviesPage";
import CreateMoviePage from "./pages/admin/Movies/CreateMoviePage";
import EditMoviePage from "./pages/admin/Movies/EditMoviePage";
import AdminUsersPage from "./pages/admin/Users/AdminUsersPage";
import AdminActorsPage from "./pages/admin/Actor/AdminActorsPage";
import EditActorPage from "./pages/admin/Actor/EditActorPage";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchList } from "./redux/watchListSlice";
import { fetchRefreshToken } from "./redux/authSlice";
import ActorCreatePage from "./pages/admin/Actor/ActorCreatePage";

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
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/actors/:id" element={<Actor />} />
        <Route path="/watchLists" element={<WatchListPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/admin/movies" element={<AdminMoviesPage />} />
        <Route path="/admin/movie/create" element={<CreateMoviePage />} />
        <Route path="/admin/movie/edit/:id" element={<EditMoviePage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/actors" element={<AdminActorsPage />} />
        <Route path="/admin/actors/:id/edit" element={<EditActorPage />} />
        <Route path="/admin/actors/create" element={<ActorCreatePage />} />
      </Route>
    </Routes>
  );
}

export default App;
