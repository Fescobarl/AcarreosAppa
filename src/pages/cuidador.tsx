import "../cuidador.css";
import mapa from "/mapa.jpg";

function Cuidador() {
  return (
    <>
      <div className="flex mx-auto place-content-center  h-[100vh] w-full lg:w-[70%] ">
        <div className="fondo-cuidador bg-[#e7ce9a] h-[100vh] p-5 w-full ">
          <div className="boton-container">
            <button className="boton-generico m-3">
              <strong>Mis acarreos</strong>
            </button>
          </div>
          <img className="mapa w-full h-full" src={mapa} alt="map" />
          <div className="boton-container">
            <button className="boton-generico">
              <strong>Actualizar mi ubicacion</strong>
            </button>
            <div className="fondo-extras">
              <button className="boton-generico">
                <strong>Estado</strong>
              </button>
              <button className="boton-terminar">
                <strong>Terminar</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cuidador;
