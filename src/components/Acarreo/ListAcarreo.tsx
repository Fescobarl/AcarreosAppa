import React, { useEffect } from "react";
import { useAcarreo } from "../../context/AcarreoContext";
import { useAuth } from "../../context/AuthContext";

const ListAcarreo = () => {
  const { usuario } = useAuth();
  const { acarreos, fetchAcarreosByCuidador } = useAcarreo();

  const trasnformDate = (date: Date) => {
    return new Date(date).toUTCString();
  };

  const stateColor = (estado: string) => {
    if (estado == "completo" || estado == "entregado") {
      return "bg-green-500 ";
    } else if (estado === "pendiente") {
      return "bg-yellow-400";
    } else if (estado == "cancelado") {
      return "bg-red-500";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const fillAcarreos = async () => {
      await fetchAcarreosByCuidador(usuario._id);
    };
    fillAcarreos();
  }, []);

  return (
    acarreos.length > 0 && (
      <section className="flex mx-auto flex-col container mt-10 text-black">
        <div className="font-bold text-3xl mb-2 text-center ">
          Acarreos de {usuario.nombre}
        </div>
        <div className="grid grid-cols-2 p-4 mt-3 space-y-4 ">
          {acarreos.map((acarreo) => (
            <div
              key={acarreo._id}
              className="w-full rounded-4xl bg-[#f5ddbe] text-xl overflow-hidden shadow-lg border-2 hover:cursor-pointer hover:bg-[#f2c487]"
            >
              <div className="pl-4 pt-2 flex-row flex">
                <h2 className="text-gray-700  ">Origen acarreo: </h2>
                <h3 className="text-gray-700  ">{acarreo.direccionOrigen}</h3>
              </div>
              <div className="pl-4 pt-2 flex-row flex">
                <h2 className="text-gray-700  ">Destino acarreo: </h2>
                <h3 className="text-gray-700  ">{acarreo.direccionFinal}</h3>
              </div>
              <div className="pl-4 pt-2 flex-row flex">
                <h2 className="text-gray-700  ">Peso: </h2>
                <h3 className="text-gray-700  ">{acarreo.peso} Kg</h3>
              </div>
              <div className="pl-4 pt-2 flex-row flex">
                <h2 className="text-gray-700  ">Costo Total: </h2>
                <h3 className="text-gray-700  ">{acarreo.costoTotal}</h3>
              </div>
              <div className="pl-4 pt-2 flex-row flex">
                <h2 className="text-gray-700  ">Fecha Inicio: </h2>
                <h3 className="text-gray-700  ">
                  {trasnformDate(acarreo.fechaInicio)}
                </h3>
              </div>
              <div className="pl-4 pt-2 flex-row flex">
                <h2 className="text-gray-700  ">Fecha entrega: </h2>
                <h3 className="text-gray-700  ">
                  {trasnformDate(acarreo.fechaEntrega)}
                </h3>
              </div>
              <div className="px-6 pt-4 pb-2">
                Estado
                <span
                  className={
                    stateColor(acarreo.estado) +
                    "p-1 m-1 rounded-full text-md font-semibold text-gray-700  " +
                    stateColor(acarreo.estado)
                  }
                >
                  {acarreo.estado.toLocaleUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  );
};

export default ListAcarreo;
