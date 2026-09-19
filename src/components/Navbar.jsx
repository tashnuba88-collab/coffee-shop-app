import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#eee" }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/admin">Admin Portal</NavLink>
      <NavLink to="/ai">AI Barista</NavLink>
    </nav>
  );
}

export default Navbar;
