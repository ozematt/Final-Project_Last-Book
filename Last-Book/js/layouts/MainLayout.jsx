import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
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
              <span className="user">name </span>
              <div className="user_avatar"></div>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
export default MainLayout;
