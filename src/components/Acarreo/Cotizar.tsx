import React, { useEffect, useState } from "react";

interface ICotizar {
  peso: string;
  distancia: number;
  total: number;
}

const numberFormat = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
  }).format(value);

const Cotizar = ({ peso, distancia, total }: ICotizar) => {
  return (
    <div className="flex place-content-center w-[60%] mx-auto border-3 border-amber-300">
      <div className="quotation-information col-md-6 col-12 text-3xl w-full flex text-center flex-col ">
        <h2 className="text-center">Cotización</h2>
        <ul>
          <li>Peso: {peso}</li>
          <li>Distancia: {distancia}</li>
        </ul>
        <p>Total: {numberFormat(total)}</p>
      </div>
    </div>
  );
};

export default Cotizar;
