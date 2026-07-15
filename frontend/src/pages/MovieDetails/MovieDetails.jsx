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
  const { id } = useParams();
  const addedToWatchList = watchlist?.some((list) => list.id === Number(id));
  const casts = movieDetails.actors || [];

  useEffect(() => {
    async function fetchMovieDetails() {
      const [detailsResponse, similarMoviesResponse, reviewsResponse] =
        await Promise.all([
          fetch(`http://localhost:3000/movies/${id}`),
          fetch(`http://localhost:3000/movies/${id}/similar`),
          fetch(`http://localhost:3000/movies/${id}/reviews`),
        ]);

      const movieDetails = await detailsResponse.json();
      const similarMovies = await similarMoviesResponse.json();
      const reviews = await reviewsResponse.json();
      setMovieDetails(movieDetails);
      setSimilarMovies(similarMovies);
      setReviews(reviews);
    }
    fetchMovieDetails();
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
        <MovieSection movies={similarMovies} title="Similar Movies" />
        <ActorCard casts={casts} />
        <ReviewSection reviews={reviews} />
      </div>
    </>
  );
};

export default MovieDetails;
