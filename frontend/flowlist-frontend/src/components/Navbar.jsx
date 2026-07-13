import { useState, useEffect } from "react";
import hamburgerIcon from "../assets/hamburger.svg";

function Navbar({ isAuthenticated }) {
  const [isExpanded, setExpanded] = useState(false);
  function clickHandler(event) {
    setExpanded((prevValue) => !prevValue);
    console.log("clicked");
  }
  return (
    <nav className="navbar">
      <div className="navbar_face">
        <a href="">Flowlist</a>
        <img src={hamburgerIcon} alt="" onClick={clickHandler} />
      </div>
      {!isExpanded || <NavbarPages isAuthenticated={isAuthenticated} />}
    </nav>
  );
}

function NavbarPages({ isAuthenticated }) {
  const loginLink = (
    <li>
      <a href="">login</a>
    </li>
  );
  const logoutLink = (
    <li>
      <a href="">logout</a>
    </li>
  );

  return (
    <div className="navbar_pages">
      <ul>
        <li>
          <a href="">Dashboard</a>
        </li>
        <li>
          <a href="">Habits</a>
        </li>
        <li>
          <a href="">Tasks</a>
        </li>
        <li>
          <a href="">Lists</a>
        </li>

        {isAuthenticated ? logoutLink : loginLink}
      </ul>
    </div>
  );
}

export default Navbar;
