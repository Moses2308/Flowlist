import AuthForm from "../components/AuthForm.jsx";

export default function LoginPage() {
  return (
    <main>
      <section className="form-container glass-back">
        <h1>Login</h1>
        <div>
          <a href="">or register</a>
        </div>
        <AuthForm type="login" />
      </section>
    </main>
  );
}
