import { useState } from "react";
import "../styles/RegisterForm.css"; // Importamos los estilos
import { RegisterData } from "../services/types/models";
import { useCliente } from "../context/ClienteContext";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import appaLogo from "/appa.png";
function Register() {
  // Estado del formulario
  const { createCliente } = useCliente();
  const { setUsuario } = useAuth();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: RegisterData = {
      nombre,
      telefono,
      correo,
      contrasena,
      direccion,
      rol: "cliente",
    };
    try {
      const { token, cliente } = await createCliente(newUser);
      if (token) {
        setUsuario(cliente, token);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error al registrar usuario",
        text: error.message,
        timer: 3000,
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <div>
          <a
            href="https://i.pinimg.com/originals/b6/2b/f4/b62bf4d6aa7019de819f80f01667e466.jpg"
            target="_blank"
          >
            <img src={appaLogo} className="logo" alt="Appa" />
          </a>
        </div>
        <h2>Registro</h2>

        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          placeholder="Ingresa tu teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Ingresa tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="direccion">Dirección</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          placeholder="Ingresa tu dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <Link
          className="text-sm text-amber-600 hover:text-amber-950"
          to="/login"
        >
          ¿Ya tienes cuenta?
        </Link>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
