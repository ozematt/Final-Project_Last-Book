import React from "react";
import { Link } from "react-router-dom";

const LoginLayout = () => {
  return (
    <section className="login-section wrapper">
      <div className="login">
        <div className="login_box">
          <div className="login_text">
            <h2 className="login_text_h2">Witaj ponownie!</h2>
          </div>
          <form className="login_form">
            <input type="text" placeholder="wpisz imię" />
            <input type="submit" value="ZALOGUJ" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginLayout;
