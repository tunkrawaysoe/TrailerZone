import React from "react";

const PersonTable = ({ mode, people, loading }) => {
  return (
    <div className="admin-actors">
      <div className="page-header">
        <div className="page-title">
          <h1>{mode}</h1>
          <p>Manage {mode} in your database.</p>
        </div>

        <div className="page-actions">
          <input className="search-input" placeholder="Search actors..." />
          <button
            className="add-btn"
            onClick={() => navigate("/admin/actors/create")}
          >
            Add {mode}
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
              {people.map((person) => (
                <tr key={person.id}>
                  <td>
                    <img
                      src={
                        person.profileImage ||
                        "https://placehold.co/60x90?text=No+Image"
                      }
                      alt={person.name}
                      className="actor-image"
                    />
                  </td>

                  <td>{person.name}</td>

                  <td>
                    {person.birthDate
                      ? new Date(person.birthDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/actors/${person.id}/edit`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteActor(person.id)}
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

export default PersonTable;
