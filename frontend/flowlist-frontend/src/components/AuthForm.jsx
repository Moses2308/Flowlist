import { useState } from "react";

export default function AuthForm({ submitHandler, type }) {
  //hooks
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    remember: false,
    tos: false,
    privPolicy: false,
  });
  //event handlers for more legible markup & controlled inputs
  function emailHandler(event) {
    setFormState((prev) => {
      const updated = { ...prev };
      updated.email = event.target.value;
      return updated;
    });
  }
  function passwordHandler(event) {
    setFormState((prev) => {
      const updated = { ...prev };
      updated.password = event.target.value;
      return updated;
    });
  }

  function rememberHandler(event) {
    setFormState((prev) => {
      const updated = { ...prev };
      updated.remember = event.target.checked;
      return updated;
    });
  }
  function tosHandler(event) {
    setFormState((prev) => {
      const updated = { ...prev };
      updated.tos = event.target.checked;
      return updated;
    });
  }
  function privacyHandler(event) {
    setFormState((prev) => {
      const updated = { ...prev };
      updated.privPolicy = event.target.checked;
      return updated;
    });
  }
  //declarations for more legible conditional rendering
  const agreements = (
    <>
      <div className="input-group single-check-inputs">
        <input
          type="checkbox"
          name="tos"
          id="tos"
          required
          onChange={tosHandler}
          checked={formState.tos}
        />
        <label htmlFor="tos">Terms of Service</label>
      </div>
      <div className="input-group single-check-inputs">
        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          required
          onChange={privacyHandler}
          checked={formState.privPolicy}
        />
        <label htmlFor="privacy">privacy policy</label>
      </div>
    </>
  );
  //RETURNED JSX
  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="input-group">
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={emailHandler}
          value={formState.email}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={passwordHandler}
          value={formState.password}
        />
      </div>

      <div>
        <div className="input-group single-check-inputs ">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            onChange={rememberHandler}
            checked={formState.remember}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        {type === "register" ? agreements : null}
      </div>

      <input className="glass-back" type="submit" value="Submit" />
    </form>
  );
}

//on the condition of type === register, show tos and privacy
