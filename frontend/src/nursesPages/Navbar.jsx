import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ setIsLoggedIn }) {
  return (
    <nav className="nav_bar">
      <Link to="" className="site-title">HMS - Nurse Panel</Link>
      <ul>
        <CustomLink to="Treatment">Treatment Update</CustomLink>
        <CustomLink to="AddPatients">Patient Condition</CustomLink>
        <CustomLink to="Medications">Req Medications</CustomLink>

        <li>
          <span
            className="nav-link logout"
            onClick={() => {
              const confirmLogout = window.confirm("Are you sure you want to logout?");
              if (confirmLogout) {
                setIsLoggedIn(false);
              }
            }}
          >
            Logout
          </span>
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} className="nav-link" {...props}>
        {children}
      </Link>
    </li>
  );
}
