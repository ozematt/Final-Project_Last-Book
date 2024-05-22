import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginLayout = () => {
  //DATA
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem("users"));
  console.log(users);

  //LOGIC
  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === "") {
      setError("Wprowadź nazwę użytkownika!");
      return;
    }

    const selectedUser = users.find((user) => user.username === username);

    if (!selectedUser) {
      setError("Nie znaleziono użytkownika o podanej nazwie!");
      return;
    }
    const selectedUserId = selectedUser.id;
    console.log(selectedUserId);

    // login to local storage
    const newUser = {
      username: username,
      id: selectedUserId,
    };
    const userJSON = JSON.stringify(newUser);
    console.log(userJSON);
    localStorage.setItem("currentUser", userJSON);
    navigate(`/users/${selectedUserId}`);

    setUsername("");
    window.location.reload();
  };

  const handleClearInput = () => {
    setUsername("");
  };

  //UI
  return (
    <section className="login-section wrapper">
      <div className="back-view">
        <div className="login_box">
          <div className="login_text">
            <h2 className="login_text_h2">Witaj ponownie!</h2>
          </div>
          <form className="login_form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              placeholder="wpisz imię"
              onFocus={handleClearInput}
              onChange={(e) => setUsername(e.target.value)} // Obsługa zmiany wartości pola
            />
            <input type="submit" value="ZALOGUJ" className="login_button" />
          </form>

          <span className="user_login-error">{error}</span>

          {/*<span>{error}</span>*/}
        </div>
      </div>
    </section>
  );
};

export default LoginLayout;
