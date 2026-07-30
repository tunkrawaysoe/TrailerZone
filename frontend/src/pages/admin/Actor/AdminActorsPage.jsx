import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActors, removeActor } from "../../../redux/actorSlice";
const AdminActorsPage = () => {
  const actors = useSelector((state) => state.actor.items);
  const loading = useSelector((state) => state.actor.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  async function deleteActor(actorId) {
    const response = await fetch(`http://localhost:3000/actors/${actorId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) return;
    dispatch(removeActor(actorId));
  }

  return (
    <div className="admin-actors">
      <div className="page-header">
        <div className="page-title">
          <h1>Actors</h1>
          <p>Manage actors in your database.</p>
        </div>

        <div className="page-actions">
          <input className="search-input" placeholder="Search actors..." />
          <button
            className="add-btn"
            onClick={() => navigate("/admin/actors/create")}
          >
            Add Actor
          </button>
        </div>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="table-container">
          <table className="actor-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {actors.map((actor) => (
                <tr key={actor.id}>
                  <td>
                    <img
                      src={
                        actor.profileImage ||
                        "https://placehold.co/60x90?text=No+Image"
                      }
                      alt={actor.name}
                      className="actor-image"
                    />
                  </td>

                  <td>{actor.name}</td>

                  <td>
                    {actor.birthDate
                      ? new Date(actor.birthDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/actors/${actor.id}/edit`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteActor(actor.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminActorsPage;
