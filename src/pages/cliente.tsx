import "../cliente.css";
import appaLogo from "/appa.png";

function Cliente() {
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
        />
      </head>
      <body className="body-cliente">
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
          </nav>
        </div>
        <div className="main-container">
          <div className="guide-number">
            <label htmlFor="">Número de guía</label>
            <input
              type="number"
              className="guide"
              placeholder="Ingrese su número de guía"
            />
          </div>
          <div className="quotation-container row">
            <div className="quotation-inputs col-md-6 col-12">
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="input-quotation"
                    id="origin"
                    placeholder="Origen del paquete"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="input-quotation"
                    id="destination"
                    placeholder="Destino del paquete"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="input-quotation"
                    id="weight"
                    placeholder="Peso aproximado del paquete"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="input-quotation"
                    id="date"
                    placeholder="Fecha del acarreo"
                  />
                </div>
              </div>
              <button>COTIZAR</button>
              <button>CONFIRMAR ACARREO</button>
            </div>
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
      </body>
    </>
  );
}

export default Cliente;
