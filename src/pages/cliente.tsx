import { useState } from "react";
import "../cliente.css";
import appaLogo from "/appa.png";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

function Cliente() {
  const { usuario, logout } = useAuth();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaAcarreo, setfechaAcarreo] = useState("");

  const handleSubmitCreateAcarreo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataAcarreo = {
      origen,
      destino,
      peso,
      fechaAcarreo,
      cliente: usuario?._id,
    };
  };
  return (
    <>
      <header>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
        />
      </header>
      <div className="body-cliente">
        <div className="nav-container">
          <a
            href="https://i.pinimg.com/originals/b6/2b/f4/b62bf4d6aa7019de819f80f01667e466.jpg"
            target="_blank"
          >
            <img src={appaLogo} className="logo-cliente" alt="Appa" />
          </a>
          <nav className="nav">
            <a className="nav-item">Rastrear acarreo</a>
            <a className="nav-item">Realizar acarreo</a>
            <a className="nav-item">Nosotros</a>
            <button className="nav-item" onClick={logout}>
              Cerrar sesión
            </button>
          </nav>
        </div>
        <div className="main-container space-y-16">
          <div className="guide-number">
            <label htmlFor="">Número de guía</label>
            <input
              type="number"
              className="guide"
              placeholder="Ingrese su número de guía"
            />
          </div>
          <div className="quotation-container row p-4">
            <form
              className="quotation-inputs col-md-6 col-12 border rounded-4xl border-amber-200"
              onSubmit={handleSubmitCreateAcarreo}
            >
              <div className="row">
                <div className="col-md-6 flex flex-row place-content-center items-center">
                  <label htmlFor="origin" className="px-3">
                    Origen
                  </label>
                  <input
                    type="text"
                    className="input-quotation"
                    id="origin"
                    placeholder="Origen del paquete"
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                  />
                </div>
                <div className="col-md-6 flex flex-row place-content-center items-center">
                  <label htmlFor="destination" className="px-3">
                    Destino
                  </label>
                  <input
                    type="text"
                    className="input-quotation"
                    id="destination"
                    placeholder="Destino del paquete"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                  />
                </div>
                <div className="col-md-6 flex flex-row place-content-center items-center">
                  <label htmlFor="weight" className="px-3">
                    Peso
                  </label>
                  <input
                    type="text"
                    className="input-quotation"
                    id="weight"
                    placeholder="Peso aproximado del paquete"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                  />
                </div>
                <div className="col-md-6  flex flex-row place-content-center items-center">
                  <label htmlFor="weight" className="px-3">
                    Fecha acarreo
                  </label>
                  <input
                    type="datetime-local"
                    className="input-quotation"
                    id="date"
                    placeholder="Fecha del acarreo"
                    value={fechaAcarreo}
                    onChange={(e) => setfechaAcarreo(e.target.value)}
                  />
                </div>
              </div>
              <button>COTIZAR</button>
              <button type="submit">CONFIRMAR ACARREO</button>
            </form>
            <div className="quotation-information col-md-6 col-12">
              <header>Cotización:</header>
              <ul>
                <li>Peso: </li>
                <li>Distancia: </li>
              </ul>
              <p>Total: </p>
            </div>
          </div>
          <footer>
            <p>
              Bienvenido a la página del cliente de AcarreosAppa. Aquí podrás
              encontrar toda la información necesaria para rastrear y realizar
              tus acarreos de manera eficiente y segura. Nuestro objetivo es
              ofrecerte un servicio de calidad, con la confianza y seguridad que
              necesitas para transportar tus bienes. En la sección "Rastrear
              acarreo", podrás seguir en tiempo real el estado y ubicación de
              tus envíos. Si deseas realizar un nuevo acarreo, dirígete a la
              sección "Realizar acarreo" donde podrás ingresar todos los
              detalles necesarios para programar tu transporte. Además, en la
              sección "Nosotros", podrás conocer más sobre nuestra empresa,
              nuestra misión y los valores que nos guían. Gracias por confiar en
              AcarreosAppa.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Cliente;
