import React from "react";
import { Link } from "react-router-dom";

const WelcomeLayout = () => {
  return (
    <section className="welcome-section wrapper">
      <div className="welcome">
        <div className="welcome_box">
          <div className="welcome_text">
            <h2 className="welcome_text_h2">Cześć,</h2>
            <h3 className="welcome_text_h3"> pierwszy raz tutaj?</h3>
          </div>
          <form className="welcome_form">
            <input type="text" placeholder="wpisz imię" />
            <input type="submit" value="STWÓRZ PROFIL" />
          </form>
          <div className="welcome_login">
            <h3 className="welcome_login_text_h3">Masz profil ?</h3>
            <Link to="/welcome/login">
              <button className="welcome_login_btn">mam profil</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WelcomeLayout;