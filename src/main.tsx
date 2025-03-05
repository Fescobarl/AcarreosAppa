import { createRoot } from "react-dom/client";

import React from "react";
import Router from "./Router.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AcarreoProvider } from "./context/AcarreoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AcarreoProvider>
          <Router />
        </AcarreoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
