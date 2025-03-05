import { FormEvent, useState } from "react";
import { useAcarreo } from "../../context/AcarreoContext";

import { Acarreo as IAcarreo } from "../../services/types/models";
import Acarreo from "./Acarreo";

const SearchAcarreo = () => {
  const [guia, setGuia] = useState("");
  const { fetchAcarreo } = useAcarreo();
  const [acarreo, setAcarreo] = useState<IAcarreo>();

  const handleCreateAcarreo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const acarreoData = await fetchAcarreo(guia);
    if (acarreoData) {
      setAcarreo(acarreoData);
      return;
    }
  };
  return (
    <div className="flex flex-col mx-auto space-y-10 place-content-start  text-black">
      <div className="guide-number">
        <label htmlFor="">Número de guía</label>
        <form className="" onSubmit={handleCreateAcarreo}>
          <input
            value={guia}
            type="text"
            className="guide border w-full border-black"
            placeholder="Ingrese su número de guía"
            onChange={(e) => setGuia(e.target.value)}
          />
          <button
            type="submit"
            className="border p-3 rounded-xl bg-[#755648] text-white hover:bg-[#6b4f42] hover:cursor-pointer"
          >
            Buscar
          </button>
        </form>
      </div>
      {acarreo && (
        <div className="">
          <Acarreo />
        </div>
      )}
    </div>
  );
};

export default SearchAcarreo;
