import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";
import { MainCard } from "./MainCard";

const MainCardSection = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.items);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  return <MainCard movies={movies} title={"Moives"} showBrowse={true} />;
};

export default MainCardSection;
