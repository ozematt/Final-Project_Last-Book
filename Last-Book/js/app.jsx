import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";
import UserLayout from "./layouts/UserLayout";
import { NumberOfBooksProvider } from "./NumberOfBooksContext";

const App = () => {
  return (
    <BrowserRouter>
      <NumberOfBooksProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="login" element={<LoginLayout />} />
            <Route path="users">
              <Route path=":userName" element={<UserLayout />} />
            </Route>
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </NumberOfBooksProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
