import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";
import hamburgerIcon from "../assets/hamburger.svg";

function Navbar({ isAuthenticated }) {
  const [isExpanded, setExpanded] = useState(false);
  function clickHandler(event) {
    setExpanded((prevValue) => !prevValue);
    console.log("clicked");
  }
  return (
    <nav className="navbar glass-back">
      <div className="navbar_face">
        <Link to="/home">Flowlist</Link>
        <img src={hamburgerIcon} alt="" onClick={clickHandler} />
      </div>
      {!isExpanded || <NavbarPages isAuthenticated={isAuthenticated} />}
    </nav>
  );
}

function NavbarPages({ isAuthenticated }) {
  const loginLink = (
    <li>
      <NavLink to="/login">login</NavLink>
    </li>
  );
  const logoutLink = (
    <li>
      <NavLink to="/logout">logout</NavLink>
    </li>
  );

  return (
    <div className="navbar_pages">
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/habits">Habits</NavLink>
        </li>
        <li>
          <NavLink to="/tasks">Tasks</NavLink>
        </li>
        <li>
          <NavLink to="/lists">Lists</NavLink>
        </li>

        {isAuthenticated ? logoutLink : loginLink}
      </ul>
    </div>
  );
}

export default Navbar;
