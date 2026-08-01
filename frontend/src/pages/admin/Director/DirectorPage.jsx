import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDirectors, removeDirector } from "../../../redux/directorSlice";
import PersonTable from "../../../components/admin/PersonTable";
import { useNavigate } from "react-router-dom";
const DirectorPage = () => {
  const directors = useSelector((state) => state.director.items);
  const loading = useSelector((state) => state.director.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deleteDirector(directorId) {
    const response = await fetch(
      `http://localhost:3000/directors/${directorId}`,
    );
    if (!response.ok) {
      alert("Failed to delete");
    }
    dispatch(removeDirector(directorId));
  }

  useEffect(() => {
    dispatch(fetchDirectors());
  }, [dispatch]);

  if (loading) return <div>loading...</div>;
  return (
    <PersonTable
      mode={"Directors"}
      people={directors}
      loading={loading}
      onDelete={deleteDirector}
    />
  );
};

export default DirectorPage;
