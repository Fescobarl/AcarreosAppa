import "../styles/cuidador.css";
import mapa from "/mapa.png";
import dot from "/reddot.png";
import { useState } from "react";

function Cuidador() {
  const [finalTravel, setFinalTravel] = useState<string[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<string>("");
  const [currentPoint, setCurrentPoint] = useState<string>("");
  const [traveledPoints, setTraveledPoints] = useState<string[]>([]);
  const [travelablePoints, setTravelablePoints] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Disponible");

  let travelPoints: { [key: string]: string[] } = {
    A: ["B", "E"],
    B: ["A", "C", "E", "F"],
    C: ["B", "D", "F"],
    D: ["C", "F"],
    E: ["A", "B", "F"],
    F: ["B", "C", "D", "E"],
  };

  let pointList = ["A", "B", "C", "D", "E", "F"];

  const endTravel = () => {
    pointList.forEach((p) => {
      const element = document.getElementById(p);
      if (element) {
        element.style.filter = "none";
        element.style.cursor = "pointer";
      }
    });
    setFinalTravel(traveledPoints);
    setTraveledPoints([]);
    setCurrentPoint("");
    setSelectedPoint("");
    setTravelablePoints([]);
    setDisabled([]);

    alert(`Viaje finalizado`);
  };

  const changeStatus = () => {
    if (status === "Disponible") {
      setStatus("No disponible");
      let element = document.getElementById("status");
      if (element) {
        element.style.color = "red";
        element.style.fontWeight = "bold";
      }
    } else {
      setStatus("Disponible");
      let element = document.getElementById("status");
      if (element) {
        element.style.color = "green";
        element.style.fontWeight = "bold";
      }
    }
  };

  const changeSelectedPoint = (point: string) => {
    if (selectedPoint) {
      let previusElement = document.getElementById(selectedPoint);
      if (previusElement) {
        previusElement.style.boxShadow = "none";
        previusElement.style.filter = "none";
      }
    }
    setSelectedPoint(point);
    alert(`Punto seleccionado: ${point}`);
    let element = document.getElementById(point);
    if (element) {
      element.style.boxShadow = "0px 0px 5px #fff";
      element.style.filter = "brightness(0) invert(1)";
    }
  };

  const setTravelPoint = (point: string) => {
    if (!selectedPoint) {
      alert(`Seleccione un punto`);
      return;
    }
    if (!currentPoint) {
      setCurrentPoint(point);
      alert(`Punto inicial establecido, seleccione el punto a viajar`);
      setTravelablePoints(travelPoints[point]);
      setTraveledPoints([...traveledPoints, point]);
      const newDisabled = pointList.filter(
        (p) => !travelPoints[point].includes(p)
      );
      setDisabled(newDisabled);
      newDisabled.forEach((p) => {
        const element = document.getElementById(p);
        if (element) {
          element.style.filter = "grayscale(100%)";
          element.style.cursor = "not-allowed";
        }
      });
    } else {
      if (travelablePoints.includes(point)) {
        setCurrentPoint(point);
        alert(`Viajando a punto ${point}`);
        const newTravelablePoints = travelPoints[point].filter(
          (p) => !traveledPoints.includes(p)
        );
        setTravelablePoints(newTravelablePoints);
        setTraveledPoints([...traveledPoints, point]);
        const newDisabled = pointList.filter(
          (p) => !newTravelablePoints.includes(p)
        );
        setDisabled(newDisabled);
        pointList.forEach((p) => {
          const element = document.getElementById(p);
          if (element) {
            element.style.filter = "none";
            element.style.cursor = "pointer";
          }
        });
        newDisabled.forEach((p) => {
          const element = document.getElementById(p);
          if (element) {
            element.style.filter = "grayscale(100%)";
            element.style.cursor = "not-allowed";
          }
        });
        if (newTravelablePoints.length === 0) {
          alert(`No se puede viajar a mas puntos`);
        }
      } else {
        alert(`No se puede viajar a punto ${point}`);
      }
    }
  };

  return (
    <div className="flex mx-auto place-content-center h-[100vh] w-full lg:w-[70%]">
      <div className="fondo-cuidador bg-[#e7ce9a] h-[100vh] p-5 w-full relative">
        <div className="boton-container"></div>
        <h1 className="status" id="status">
          {status}
        </h1>
        <button
          className="boton-generico"
          onClick={() => setTravelPoint(selectedPoint)}
        >
          <strong>Actualizar mi ubicacion</strong>
        </button>
        <div className="relative w-full h-full">
          <div className="map-container">
            <img className="mapa" src={mapa} alt="map" />
            <button
              className="custom-position-A"
              id="A"
              onClick={() => changeSelectedPoint("A")}
            >
              <img src={dot} width={20} height={50} alt="A" />
            </button>
            <button
              className="custom-position-B"
              id="B"
              onClick={() => changeSelectedPoint("B")}
            >
              <img src={dot} width={20} height={50} alt="B" />
            </button>
            <button
              className="custom-position-C"
              id="C"
              onClick={() => changeSelectedPoint("C")}
            >
              <img src={dot} width={20} height={50} alt="C" />
            </button>
            <button
              className="custom-position-D"
              id="D"
              onClick={() => changeSelectedPoint("D")}
            >
              <img src={dot} width={20} height={50} alt="D" />
            </button>
            <button
              className="custom-position-E"
              id="E"
              onClick={() => changeSelectedPoint("E")}
            >
              <img src={dot} width={20} height={50} alt="E" />
            </button>
            <button
              className="custom-position-F"
              id="F"
              onClick={() => changeSelectedPoint("F")}
            >
              <img src={dot} width={20} height={50} alt="F" />
            </button>
          </div>
        </div>
        <div>
          {finalTravel.length > 0 && (
            <div id="final-travel">
              <h1>Viaje terminado, el trayecto fue: </h1>
              <p id="final-travel-p">{finalTravel.join(", ")}</p>
            </div>
          )}
        </div>
        <div className="boton-container">
          <div className="fondo-extras">
            <button className="boton-generico" onClick={() => changeStatus()}>
              <strong>Estado</strong>
            </button>
            <button className="boton-terminar" onClick={() => endTravel()}>
              <strong>Terminar</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuidador;
