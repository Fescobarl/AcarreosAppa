import "../cliente.css";

import { useAuth } from "../context/AuthContext";

import BodyCliente from "../components/Cliente/BodyCliente";

function Cliente() {
  const { usuario, logout } = useAuth();

  return (
    <>
      <header>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
        />
      </header>
      <BodyCliente usuario={usuario} logout={logout} />
    </>
  );
}

export default Cliente;
