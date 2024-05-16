import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Welcome = ({ onName }) => {
  //PARENT ACTION
  const [dataToSend, setDataToSend] = useState("Name");
  onName(dataToSend);
  console.log(dataToSend);

  const [nameEntered, setNameEntered] = useState("");
  console.log(nameEntered);
  const [error, setError] = useState("");

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
      setDataToSend(nameEntered);

      let users = userData || [];

      const newUser = { username: nameEntered };
      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    setNameEntered("");
    // localStorage.clear();
    console.log(userData);
  };

  // const handleFormReset = (e) => {};

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
              {/*<Link to="/user">*/}
              <input
                type="submit"
                value="STWÓRZ PROFIL"
                className="input_add_user"
              />
              {/*</Link>*/}
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
