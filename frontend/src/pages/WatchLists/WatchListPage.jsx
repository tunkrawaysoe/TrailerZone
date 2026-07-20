import { useSelector } from "react-redux";
import { MainCard } from "../../components/MainCard";
import "./WatchListPage.css";
const WatchListPage = () => {
  const movies = useSelector((state) => state.watchList.movies);
  const { accessToken, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div className="section">Loading...</div>;
  }
  if (!accessToken) {
    return (
      <div className="login-text">
        <h2>You have to register or log in first.</h2>
      </div>
    );
  }

  return (
    <div className="section">
      <MainCard movies={movies} title="Watch Lists" />
    </div>
  );
};

export default WatchListPage;
