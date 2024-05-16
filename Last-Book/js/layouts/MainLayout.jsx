import React from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import Welcome from "../Welcome";

const MainLayout = () => {
  const location = useLocation();

  const [userName, setUserName] = useState("Name");

  const handledNameChange = (name) => {
    setUserName(name);
  };

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
                <div className="user_avatar"></div>
              </div>
            </div>
          </nav>
        </header>
        <Outlet />
        <Welcome onName={handledNameChange} />
      </div>
    </>
  );
};
export default MainLayout;
