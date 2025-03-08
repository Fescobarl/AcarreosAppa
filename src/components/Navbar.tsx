import React, { useState } from "react";
import appaLogo from "/appa.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="nav-container">
      <NavLink to={"/"}>
        <img
          src={appaLogo}
          className="logo-cliente"
          width={50}
          height={50}
          alt="Appa"
        />
      </NavLink>
      <nav className="nav">
        {usuario?.rol == "cliente" ? (
          <NavLink className="nav-item" to={"/guia"}>
            Rastrear acarreo
          </NavLink>
        ) : usuario.rol == "cuidador" ? (
          <NavLink className="nav-item" to={"/acarreos"}>
            Ver acarreos
          </NavLink>
        ) : (
          <></>
        )}
        <button className="nav-item" onClick={openModal}>
          Nosotros
        </button>
        <button className="nav-item" onClick={logout}>
          Cerrar sesión
        </button>
      </nav>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Visión y Descripción de la Empresa</h2>
          <p>
            Nuestra empresa se dedica a proporcionar servicios de acarreo de
            alta calidad a través de las diferentes naciones, asegurando la
            satisfacción de nuestros clientes a través de un servicio eficiente
            y confiable de acarreos con nuestros bisontes.
          </p>
          <p>
            Visión: Ser la empresa líder en servicios de acarreo, reconocida por
            nuestra excelencia y compromiso con la calidad.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
