import React from "react";
import appaLogo from "/appa.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  return (
    <div className="nav-container">
      <NavLink to={"/"}>
        <img src={appaLogo} className="logo-cliente" alt="Appa" />
      </NavLink>
      <nav className="nav">
        {usuario?.rol == "cliente" ? (
          <NavLink className="nav-item" to={"/guia"}>
            Rastrear acarreo
          </NavLink>
        ) : (
          <NavLink className="nav-item" to={"/acarreos"}>
            Ver acarreos
          </NavLink>
        )}
        <a className="nav-item">Nosotros</a>
        <button className="nav-item" onClick={logout}>
          Cerrar sesión
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
