import AuthForm from "../components/AuthForm.jsx";

export default function RegisterPage() {
  return (
    <>
      <section className="form-container glass-back">
        <h1>Register</h1>
        <div>
          <a href="">or login</a>
        </div>
        <AuthForm type="register" />
      </section>
    </>
  );
}
