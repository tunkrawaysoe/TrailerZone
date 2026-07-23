import React, { useEffect, useState } from "react";
import { MainCard } from "../../../components/MainCard";
import PaginationButton from "../../../components/PaginationButton";
import "./Movies.css";

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const totalPagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }

  async function fetchAllData() {
    const response = await fetch(`http://localhost:3000/movies?page=${page}`);
    const data = await response.json();
    setAllMovies(data.movies);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    fetchAllData();
  }, [page]);

  return (
    <>
      <MainCard movies={allMovies} title={"Movies"} />
      <PaginationButton
        totalPagesArray={totalPagesArray}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Movies;
