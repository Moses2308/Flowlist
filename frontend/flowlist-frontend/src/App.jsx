import { useEffect, useState } from "react";
import "../stylesheets/style.css";
import background from "./assets/monica-flores-gZk0fJSlETY-unsplash.jpg";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <>
      <header>
        <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <HomePage />
      <footer className="glass-back footer"></footer>
    </>
  );
}

export default App;
