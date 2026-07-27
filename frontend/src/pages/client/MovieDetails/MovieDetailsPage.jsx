import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import MovieSection from "../../../components/MovieCardSection";
import { useParams } from "react-router-dom";
import ActorCard from "./ActorCard";
import ReviewSection from "./ReviewSection";
import TrailerSection from "./TrailerSection";
import { useDispatch, useSelector } from "react-redux";
import MovieDetailsCard from "./MovieDetailsCard";
import "./MovieDetails.css";
import { fetchMovie } from "../../../redux/movieSlice";

const MovieDetails = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [userReviewed, setUserReviewed] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

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
      const [similarMoviesResponse, trailerResponse] = await Promise.all([
        fetch(`http://localhost:3000/movies/${id}/similar`),
        fetch(`http://localhost:3000/movies/${id}/trailer`),
      ]);
      const similarMovies = await similarMoviesResponse.json();
      const movieTrailers = await trailerResponse.json();
      setSimilarMovies(similarMovies);
      setTrailers(movieTrailers);
    }
    dispatch(fetchMovie(id));
    fetchMovieDetails();
    getReviews();
  }, [id]);

  return (
    <div className="section">
      <MovieDetailsCard movieId={id} />
      <ActorCard />
      <TrailerSection trailers={trailers} />
      <ReviewSection
        reviews={reviews}
        userReviewed={userReviewed}
        movieId={id}
        getReviews={getReviews}
      />
      <MovieSection movies={similarMovies} title="Similar Movies" />
    </div>
  );
};

export default MovieDetails;
