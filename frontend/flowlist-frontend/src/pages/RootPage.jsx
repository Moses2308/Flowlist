import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

export default function RootPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="glass-back footer"></footer>
    </>
  );
}
