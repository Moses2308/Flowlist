import { NavLink } from "react-router";
import AuthForm from "../components/AuthForm.jsx";

export default function LoginPage() {
  return (
    <main>
      <section className="form-container glass-back">
        <h1>Login</h1>
        <div>
          <NavLink to="/register">or register</NavLink>
        </div>
        <AuthForm type="login" />
      </section>
    </main>
  );
}
