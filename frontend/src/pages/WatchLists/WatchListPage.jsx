import { useSelector } from "react-redux";
import { MainCard } from "../../components/MainCard";

const WatchListPage = () => {
  const movies = useSelector((state) => state.watchList.movies);
  return (
    <div className="section">
      <MainCard movies={movies} title={"Watch Lists"} />
    </div>
  );
};

export default WatchListPage;
