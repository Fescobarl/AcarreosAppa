import appaLogo from "/appa.png";
import "../login.css";
import "../index.css";
import React, { useState } from "react";
import Swal from "sweetalert2";

import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, loading, error } = useAuth();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(correo, contrasena);
    } catch (error: any) {
      Swal.fire({
        title: "Datos incorrectos",
        timer: 3000,
        icon: "error",
      });
    }
  };

  return (
    <>
      <main className="flex w-full m-auto place-content-center  justify-items-center ">
        <div className="fondo">
          <div>
            <a
              href="https://i.pinimg.com/originals/b6/2b/f4/b62bf4d6aa7019de819f80f01667e466.jpg"
              target="_blank"
            >
              <img src={appaLogo} className="logo" alt="Appa" />
            </a>
          </div>
          <h1 className="h1 p-4">Login</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label className="label">
              <strong>User:</strong>
            </label>
            <input
              className="input"
              type="text"
              name="user"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <label className="label">
              <strong>Password:</strong>
            </label>
            <input
              className="input"
              type="password"
              name="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <a
              className="a"
              href="https://media.tenor.com/aSkdq3IU0g0AAAAM/laughing-cat.gif"
              target="_blank"
            >
              ¿No tienes cuenta? Clic Aquí
            </a>
            <button className="button" type="submit" disabled={loading}>
              {loading ? "Cargando..." : <strong>Entrar</strong>}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
