import React, { useState } from "react";
import {
  Cliente,
  Cuidador,
  NewAcarreo as INewAcarreo,
} from "../../services/types/models";
import Cotizar from "./Cotizar";
import Swal from "sweetalert2";
import { useAcarreo } from "../../context/AcarreoContext";

interface NewAcarreoI {
  usuario: Cliente | Cuidador;
}

const NewAcarreo = ({ usuario }: NewAcarreoI) => {
  const { addAcarreo } = useAcarreo();
  const [distancia, setDistancia] = useState(0);
  const [total, setTotal] = useState(0);
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaAcarreo, setfechaAcarreo] = useState("");
  const [showCotizar, setShowCotizar] = useState(false);

  const handleSubmitCreateAcarreo = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (origen && destino && peso && fechaAcarreo) {
      calculateAll();
      const fechaInicio = new Date(fechaAcarreo);
      const dataAcarreo: INewAcarreo = {
        direccionOrigen: origen,
        direccionFinal: destino,
        peso: parseInt(peso),
        fechaInicio: fechaInicio,
        fechaEntrega: new Date(fechaInicio.getTime() + 1000 * 60 * 60 * 24 * 5),
        clienteld: usuario._id,
        costoTotal: total,
        estado: "pendiente",
      };
      Swal.fire({
        title: "¿Quieres hacer el acarreo?",
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Acarreo generado exitosamente", "", "success");
        }
      });
      await addAcarreo(dataAcarreo);
    } else {
      Swal.fire({
        title: "Todos los datos son requeridos",
        timer: 3000,
        icon: "warning",
      });
    }
  };

  const calculateAll = () => {
    const calculateDistance = () => {
      const max = Math.max(origen.length, destino.length);
      const min = Math.max(origen.length, destino.length);
      const factor = Math.floor(
        Math.random() * (Math.abs(max - min) + 1) + min
      );
      setDistancia(factor);
    };
    calculateDistance();
    setTotal(
      Math.floor(
        distancia * parseInt(peso) * (Math.abs(1000 - 100) + 1) + 10000
      )
    );
  };

  const handleCotizar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    calculateAll();
    if (origen && destino && peso) {
      setShowCotizar(true);
    } else {
      Swal.fire({
        title: "Ingrese primero los datos",
        timer: 3000,
        icon: "warning",
      });
    }
  };
  return (
    <>
      <form
        className="quotation-inputs border rounded-4xl border-amber-200 w-auto mx-auto m-5 space-y-14"
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
        <button onClick={handleCotizar} type="button">
          COTIZAR
        </button>
        <button type="submit">CONFIRMAR ACARREO</button>
      </form>
      {showCotizar && (
        <Cotizar peso={peso} distancia={distancia} total={total} />
      )}
    </>
  );
};

export default NewAcarreo;
