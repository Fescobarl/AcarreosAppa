import { createRoot } from "react-dom/client";

import React from "react";
import Routes from "./Router.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
