import React from "react";

const LoginLayout = () => {
  return (
    <section className="login-section wrapper">
      <div className="back-view">
        <div className="login_box">
          <div className="login_text">
            <h2 className="login_text_h2">Witaj ponownie!</h2>
          </div>
          <form className="login_form">
            <input type="text" placeholder="wpisz imię" />
            <input type="submit" value="ZALOGUJ" className="login_button" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginLayout;
