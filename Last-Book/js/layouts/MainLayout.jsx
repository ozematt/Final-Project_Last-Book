import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Welcome from "../Welcome";
import { useNumberOfBooks } from "../NumberOfBooksContext";

const MainLayout = () => {
  ////DATA
  const [userName, setUserName] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser ? currentUser.username : "Name";
  });
  const [loggedIn, setLoggedIn] = useState(false);
  //counter
  const { setNumberOfBooks } = useNumberOfBooks();

  ////LOGIC
  const handledNameChange = (name) => {
    setUserName(name);
  };
  const { numberOfBooks } = useNumberOfBooks();

  useEffect(() => {
    if (userName === "Name") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [userName]);

  const handleLogoClicked = () => {
    localStorage.removeItem("currentUser");
  };

  ////UI
  return (
    <>
      <div>
        <header className="header">
          <nav className="wrapper">
            <div className="nav_box">
              <div className="counter_box">
                <span className="counter">
                  {numberOfBooks > 0 ? numberOfBooks : 0}
                </span>
              </div>
              <div>
                <a href="/" className="logo" onClick={handleLogoClicked}>
                  Last Book
                </a>
              </div>
              <div className="user_box">
                <span className="user">{userName}</span>
                <div className="user_avatar">
                  {userName !== "Name" ? (
                    <img
                      className="avatar_svg"
                      src={"/assets/avatar.svg"}
                      alt="avatar"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Outlet />
        {!loggedIn ? <Welcome onName={handledNameChange} /> : null}
      </div>
    </>
  );
};
export default MainLayout;
