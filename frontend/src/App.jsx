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
import ActorCreatePage from "./pages/admin/Actor/ActorCreatePage";
import DirectorPage from "./pages/admin/Director/DirectorPage";
import DirectorCreatePage from "./pages/admin/Director/DirectorCreatePage";
import DirectorEditPage from "./pages/admin/Director/DirectorEditPage";
import GenrePage from "./pages/admin/Genres/GenrePage";
import GrenreCreatePage from "./pages/admin/Genres/GrenreCreatePage";
import GenreEditPage from "./pages/admin/Genres/GenreEditPage";
import ReviewPage from "./pages/admin/Review/ReviewPage";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchList } from "./redux/watchListSlice";
import { fetchRefreshToken } from "./redux/authSlice";

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRefreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchWatchList(accessToken));
  }, [accessToken, dispatch]);

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
        <Route path="/admin/directors" element={<DirectorPage />} />
        <Route
          path="/admin/directors/create"
          element={<DirectorCreatePage />}
        />
        <Route
          path="/admin/directors/:id/edit"
          element={<DirectorEditPage />}
        />
        <Route path="/admin/genres" element={<GenrePage />} />
        <Route path="/admin/genres/create" element={<GrenreCreatePage />} />
        <Route path="/admin/genres/:id/edit" element={<GenreEditPage />} />
        <Route path="/admin/reviews" element={<ReviewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
