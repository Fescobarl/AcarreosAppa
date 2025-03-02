// src/components/Spinner.tsx
import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>Cargando...</div>
    </div>
  );
};

export default Spinner;
