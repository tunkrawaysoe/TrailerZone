import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MovieSection from "../../components/MovieCardSection";
import MovieDetailsCard from "../../components/MovieDetailsCard";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";
import ActorCard from "../../components/ActorCard";
import ReviewSection from "../../components/ReviewSection";
import TrailerSection from "./TrailerSection";
import { useSelector } from "react-redux";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [userReviewed, setUserReviewed] = useState(false);
  const { id } = useParams();
  const casts = movieDetails.actors || [];
  const accessToken = useSelector((state) => state.auth.accessToken);
  const watchlist = useSelector((state) => state.watchList.movies);
  const addedToWatchList = watchlist?.some((list) => list.id === Number(id));

  async function getReviews() {
    const response = await fetch(`http://localhost:3000/movies/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setReviews(data.reviews);
    setUserReviewed(data.userReviewed);
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      const [detailsResponse, similarMoviesResponse, trailerResponse] =
        await Promise.all([
          fetch(`http://localhost:3000/movies/${id}`),
          fetch(`http://localhost:3000/movies/${id}/similar`),
          fetch(`http://localhost:3000/movies/${id}/trailer`),
        ]);
      const movieDetails = await detailsResponse.json();
      const similarMovies = await similarMoviesResponse.json();
      const movieTrailers = await trailerResponse.json();
      setMovieDetails(movieDetails);
      setSimilarMovies(similarMovies);
      setTrailers(movieTrailers);
    }
    fetchMovieDetails();
    getReviews();
  }, [id]);

  return (
    <>
      <Navbar />
      <MovieDetailsCard
        movieDetails={movieDetails}
        addedToWatchList={addedToWatchList}
      />
      <div className="section">
        <ActorCard casts={casts} />
        <TrailerSection trailers={trailers} />
        <ReviewSection
          reviews={reviews}
          userReviewed={userReviewed}
          movieId={id}
          getReviews={getReviews}
        />
        <MovieSection movies={similarMovies} title="Similar Movies" />
      </div>
    </>
  );
};

export default MovieDetails;
