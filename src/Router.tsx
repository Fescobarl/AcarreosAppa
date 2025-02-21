import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/login";

const Router = () => {

  const { status, user } = useCheckAuth();
   
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
