import { Link, NavLink } from "react-router";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero_content">
        <p>you are what you [repeat]</p>
        <NavLink to="/register" className="linkButton glass-back">
          register
        </NavLink>
      </div>
    </section>
  );
}
