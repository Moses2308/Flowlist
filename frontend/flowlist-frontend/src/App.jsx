import { useEffect, useState } from "react";
import "../stylesheets/style.css";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [isAuthenticated, setAuth] = useState(false);
  return (
    <>
      <header>
        <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <main></main>
      <footer></footer>
    </>
  );
}

export default App;
