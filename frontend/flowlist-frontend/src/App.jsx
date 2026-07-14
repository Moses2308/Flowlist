import { useEffect, useState } from "react";
import "../stylesheets/style.css";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

function App() {
  const [isAuthenticated, setAuth] = useState(false);
  return (
    <>
      <header>
        <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <main>
        <Hero />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
