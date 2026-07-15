import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MovieSection from "../../components/MovieCardSection";
import MovieDetailsCard from "../../components/MovieDetailsCard";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";
import ActorCard from "../../components/ActorCard";
import ReviewSection from "../../components/ReviewSection";

const MovieDetails = ({ watchlist, getWatchList }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReviewed, setUserReviewed] = useState(false);
  const { id } = useParams();
  console.log(id);
  const addedToWatchList = watchlist?.some((list) => list.id === Number(id));
  const casts = movieDetails.actors || [];

  async function getReviews() {
    const response = await fetch(`http://localhost:3000/movies/${id}/reviews`);
    const data = await response.json();
    setReviews(data.reviews);
    setUserReviewed(data.userReviewed);
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      const [detailsResponse, similarMoviesResponse] = await Promise.all([
        fetch(`http://localhost:3000/movies/${id}`),
        fetch(`http://localhost:3000/movies/${id}/similar`),
      ]);
      const movieDetails = await detailsResponse.json();
      const similarMovies = await similarMoviesResponse.json();
      setMovieDetails(movieDetails);
      setSimilarMovies(similarMovies);
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
        getWatchList={getWatchList}
      />
      <div className="section">
        <ActorCard casts={casts} />
        <MovieSection movies={similarMovies} title="Similar Movies" />
        <ReviewSection
          reviews={reviews}
          userReviewed={userReviewed}
          movieId={id}
          getReviews={getReviews}
        />
      </div>
    </>
  );
};

export default MovieDetails;
