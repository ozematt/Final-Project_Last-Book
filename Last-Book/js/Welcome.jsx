import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "./api/constans";
import { useNavigate } from "react-router-dom";

const Welcome = ({ onName }) => {
  ////DATA

  const [nameEntered, setNameEntered] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  ////LOGIC
  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameEntered(value);
  };

  const handleSubmitUserName = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = userData.find((user) => user.username === nameEntered);

    if (existingUser) {
      setError("Użytkownik już istnieje!");
    } else {
      const newUser = { username: nameEntered };

      fetch(`${API}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((createdUser) => {
          const updatedUsers = [...userData, createdUser];
          localStorage.setItem("users", JSON.stringify(updatedUsers));

          localStorage.setItem("currentUser", JSON.stringify(createdUser));

          //action with data sent to parent
          onName(nameEntered);

          //navigate to user site
          navigate(`/users/${createdUser.id}`);
        })
        .catch((error) => {
          console.error("Błąd podczas dodawania użytkownika:", error);
        });
    }
    setNameEntered("");
    // localStorage.clear();
  };

  ////UI
  return (
    <>
      <section className="welcome-section wrapper">
        <div className="back-view">
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
                className="input_add_user"
              />
            </form>
            <div className="welcome_login">
              <h3 className="welcome_login_text_h3">Masz profil ?</h3>
              <Link to="/login">
                <button className="welcome_login_btn">mam profil</button>
              </Link>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Welcome;
