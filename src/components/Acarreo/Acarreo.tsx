import React, { useEffect, useState } from "react";
import { useAcarreo } from "../../context/AcarreoContext";
import { useNavigate } from "react-router-dom";

const Acarreo = () => {
  const navigate = useNavigate();
  const { acarreo } = useAcarreo();
  const [origen, setOrigen] = useState("");
  const [destino, setdestino] = useState("");
  const [peso, setpeso] = useState(0);
  const [fechaAcarreo, setfechaAcarreo] = useState(new Date());
  const [fehaDestiono, setfehaDestiono] = useState(new Date());

  useEffect(() => {
    console.log(acarreo);
    if (acarreo) {
      setOrigen(acarreo.direccionOrigen);
      setdestino(acarreo.direccionFinal);
      setpeso(acarreo.peso);
      setfechaAcarreo(new Date(acarreo.fechaInicio));
      setfehaDestiono(new Date(acarreo.fechaEntrega));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex text-3xl p-5">
      <div className="grid grid-cols-2 p-4 mx-auto border-4 rounded-4xl space-y-5 w-full place-content-between place-items-stretch">
        <label htmlFor="origin" className="border-b-2 p-3 ">
          Origen
        </label>
        <input
          type="text"
          className="border-b-2 p-3"
          id="origin"
          placeholder="Origen del paquete"
          value={origen}
          disabled
        />
        <label htmlFor="destination" className="border-b-2 p-3">
          Destino
        </label>
        <input
          type="text"
          className="border-b-2 p-3"
          id="destination"
          placeholder="Destino del paquete"
          value={destino}
          disabled
        />
        <label htmlFor="weight" className="border-b-2 p-3">
          Peso
        </label>
        <input
          type="number"
          className="border-b-2 p-3"
          id="weight"
          placeholder="Peso aproximado del paquete"
          value={peso}
          disabled
        />
        <label htmlFor="weight" className="border-b-2 p-3">
          Fecha acarreo
        </label>
        <input
          type="text"
          className="border-b-2 p-3"
          id="date"
          value={fechaAcarreo.toUTCString()}
          disabled
        />
        <label htmlFor="weight" className="px-3">
          Fecha entrega
        </label>
        <input
          type="text"
          className="px-3"
          id="date"
          value={fehaDestiono.toUTCString()}
          disabled
        />
      </div>
    </div>
  );
};

export default Acarreo;
