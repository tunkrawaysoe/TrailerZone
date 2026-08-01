import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDirectors } from "../../../redux/directorSlice";
import DirectorOrActorCard from "../../../components/admin/PersonTable";
const DirectorPage = () => {
  const directors = useSelector((state) => state.director.items);
  const loading = useSelector((state) => state.director.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDirectors());
  }, [dispatch]);

  if (loading) return <div>loading...</div>;
  return (
    <DirectorOrActorCard
      mode={"Directors"}
      people={directors}
      loading={loading}
    />
  );
};

export default DirectorPage;
