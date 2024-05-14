import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import WelcomeLayout from "./layouts/WelcomeLayout";
import LoginLayout from "./layouts/LoginLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/welcome" element={<WelcomeLayout />} />
          <Route path="/login" element={<LoginLayout />} />
          <Route />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
