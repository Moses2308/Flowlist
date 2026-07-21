import { NavLink } from "react-router";
import AuthForm from "../components/AuthForm.jsx";

export default function RegisterPage() {
  return (
    <>
      <section className="form-container glass-back">
        <h1>Register</h1>
        <div>
          <NavLink to="/login">or login</NavLink>
        </div>
        <AuthForm type="register" />
      </section>
    </>
  );
}
