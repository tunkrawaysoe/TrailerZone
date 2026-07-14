import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MovieSection from "../../components/MovieCardSection";
import MovieDetailsCard from "../../components/MovieDetailsCard";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";

const MovieDetails = ({ watchlist, getWatchList }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const { id } = useParams();
  const addedToWatchList = watchlist?.some((list) => list.id === Number(id));

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
  }, [id]);

  return (
    <>
      <Navbar />
      <MovieDetailsCard
        movieDetails={movieDetails}
        addedToWatchList={addedToWatchList}
        getWatchList={getWatchList}
      />
      <MovieSection movies={similarMovies} title="Similar Movies" />
    </>
  );
};

export default MovieDetails;
