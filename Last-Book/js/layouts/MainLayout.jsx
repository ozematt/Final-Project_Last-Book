import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const [userName, setUserName] = useState("Name");
  const [nameEntered, setNameEntered] = useState("");
  // const [users, setUsers] = useState({});
  const [error, setError] = useState("");

  //hidden welcome area
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    const value = e.target.value;
    setIsLoggedIn(true);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameEntered(value);
  };

  const handleSubmitUserName = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("users"));
    let existingUser;

    if (userData) {
      existingUser = userData.find((user) => user.username === nameEntered);
    }

    if (existingUser !== undefined) {
      setError("Użytkownik już istnieje!");
    } else {
      setUserName(nameEntered);

      let users = userData || [];
      const newUser = { username: nameEntered };
      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setError("");
      setNameEntered("");
    }
    // localStorage.clear();
    console.log(userData);
  };

  const handleFormReset = (e) => {};

  return (
    <div>
      <header className="header">
        <nav className="wrapper">
          <div className="nav_box">
            <div className="counter_box">
              <span className="counter">0</span>
            </div>
            <div>
              <a href="#" className="logo">
                Last Book
              </a>
            </div>
            <div className="user_box">
              <span className="user">{userName}</span>
              <div className="user_avatar"></div>
            </div>
          </div>
        </nav>
      </header>

      {isLoggedIn === false ? (
        <section className="welcome-section wrapper">
          <div className="welcome">
            <div className="welcome_box">
              <div className="welcome_text">
                <h2 className="welcome_text_h2">Cześć,</h2>
                <h3 className="welcome_text_h3"> pierwszy raz tutaj?</h3>
              </div>
              <form className="welcome_form" onSubmit={handleSubmitUserName}>
                <input
                  type="text"
                  placeholder="wpisz imię"
                  value={nameEntered}
                  onChange={handleNameChange}
                />
                <input
                  type="submit"
                  value="STWÓRZ PROFIL"
                  onClick={handleFormReset}
                />
              </form>
              <div className="welcome_login">
                <h3 className="welcome_login_text_h3">Masz profil ?</h3>
                <Link to="/login">
                  <button className="welcome_login_btn" onClick={handleLogin}>
                    mam profil
                  </button>
                </Link>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <Outlet />
    </div>
  );
};
export default MainLayout;
