import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Welcome from "../Welcome";

const MainLayout = () => {
  const location = useLocation();

  const [userName, setUserName] = useState("Name");
  const [loggedIn, setLoggedIn] = useState(false);

  const handledNameChange = (name) => {
    setUserName(name);
  };

  useEffect(() => {
    if (userName === "Name") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [userName]);

  return (
    <>
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
                <div className="user_avatar">
                  {!(userName === "Name") ? (
                    <img
                      className="avatar_svg"
                      src="./assets/avatar.svg"
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
