import React, { useEffect } from "react";
import { MainCard } from "../../components/MainCard";
import { useState } from "react";
import "./Movies.css";
import PaginationButton from "../../components/PaginationButton";

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const totalPagesArray = [];
  console.log(totalPagesArray);
  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }

  async function fetchAllData() {
    const response = await fetch(`http://localhost:3000/movies?page=${page}`);
    const movies = await response.json();
    setTotalPages(movies.totalPages);
    setAllMovies(movies.movies);
  }

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <>
      <MainCard movies={allMovies} />
      <PaginationButton
        totalPagesArray={totalPagesArray}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Movies;
