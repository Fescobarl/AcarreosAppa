import { createRoot } from "react-dom/client";

import React from "react";
import Router from "./Router.tsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AcarreoProvider } from "./context/AcarreoContext.tsx";
import { ClienteProvider } from "./context/ClienteContext.tsx";
import { CuidadorProvider } from "./context/CuidadorContext.tsx";
import { BisonteProvider } from "./context/BisonteContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ClienteProvider>
          <CuidadorProvider>
            <BisonteProvider>
              <AcarreoProvider>
                <Router />
              </AcarreoProvider>
            </BisonteProvider>
          </CuidadorProvider>
        </ClienteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
