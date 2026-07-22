import { useDispatch, useSelector } from "react-redux";
import { fetchWatchList } from "../redux/watchListSlice";

const MovieDetailsCard = ({ movieDetails, movieId }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const watchlist = useSelector((state) => state.watchList.movies);
  const addedToWatchList = watchlist?.some(
    (list) => list.id === Number(movieId),
  );
  const dispatch = useDispatch();

  async function handleWatchList() {
    if (!addedToWatchList) {
      const response = await fetch(
        `http://localhost:3000/watchlist/${movieDetails.id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(fetchWatchList(accessToken));
      } else {
        console.log(data.message);
      }

      return;
    }

    const response = await fetch(
      `http://localhost:3000/watchlist/${movieDetails.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();

    if (response.ok) {
      dispatch(fetchWatchList(accessToken));
    } else {
      console.log(data.message);
    }
  }
  return (
    <>
      <section className="movie-details-container">
        <div className="details-image-card">
          <img src={movieDetails.posterUrl} />
        </div>
        <div className="movie-details">
          <h1>{movieDetails.title}</h1>
          <div className="movie-meta">
            <span>{movieDetails.title}</span>
            {movieDetails.genres?.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
          <p className="overview">{movieDetails.description}</p>

          <div className="buttons">
            <button
              onClick={() => {
                document.getElementById("trailers").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              ▶ Watch Trailer
            </button>

            <button className="watchlist" onClick={handleWatchList}>
              {addedToWatchList ? "✓ Added" : "+ Add Watchlist"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetailsCard;
