import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-logo">MovieHub</h2>

      <nav>
        <NavLink end to="/admin">
          Dashboard
        </NavLink>
        <NavLink to="/admin/movies">Movies</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/reviews">Reviews</NavLink>
      </nav>
    </aside>
  );
}
