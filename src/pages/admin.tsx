import "../styles/admin.css";
import appa from "/appa.png";
import arrow from "/arrow.png";
import arrow2 from "/arrow (1).png";
import { useEffect, useState } from "react";
import { useBisonte } from "../context/BisonteContext";
import { useCuidador } from "../context/CuidadorContext";
import { Bisonte, Cuidador } from "../services/types/models";

interface CuidadorBisonteI {
  bisonName: string;
  bisonId: string;
  cuidadorName: string;
  cuidadorId: string;
}

function Admin() {
  const { bisontes, fetchBisontes } = useBisonte();
  const { cuidadores, fetchCuidadores } = useCuidador();
  const [cuidadorBisonte, setCuidadorBisonte] = useState<CuidadorBisonteI[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(true);

  const openCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getData = async () => {
      await fetchBisontes();
      await fetchCuidadores();
      const data: CuidadorBisonteI[] = bisontes.flatMap((bison) =>
        cuidadores
          .filter((cuidador) => bison.cuidador === cuidador._id)
          .map((cuidador) => ({
            bisonName: bison.nombre,
            bisonId: bison._id,
            cuidadorName: cuidador.nombre,
            cuidadorId: cuidador._id,
          }))
      );
      setCuidadorBisonte(data);
    };
    getData();
  }, []);

  return (
    <>
      <body className="body-cliente">
        <div
          className={`container-admin ${isOpen ? "" : "sidebar-admin-hidden"}`}
        >
          <aside
            className={`sidebar-admin ${isOpen ? "" : "hidden"}`}
            id="sidebar"
          >
            <img
              src={arrow}
              alt="arrow left"
              onClick={openCloseSidebar}
              className={`arrow ${isOpen ? "" : "hidden-admin"}`}
            />
            <button>Acarreos</button>
            <button>Inventario</button>
            <button>Reporte</button>
          </aside>

          <main className="content-admin">
            <section className="search-section-admin">
              {!isOpen && (
                <img
                  src={arrow2}
                  alt="arrow right"
                  onClick={openCloseSidebar}
                  className="arrow-open-admin"
                />
              )}
              <input type="text" placeholder="Buscador" />
            </section>
            <table className="text-black grid grid-cols-2 gap-2 place-content-center place-items-center text-2xl mx-auto mt-4 border-2 p-2">
              <th className="">
                <td>Cuidador</td>
              </th>
              <th>
                <td>Bisonte</td>
              </th>
            </table>
            <section className="table-section-admin text-2xl p-4 ">
              {cuidadorBisonte.map((value) => (
                <>
                  <div
                    key={value.cuidadorId}
                    className="column-admin-carer hover:cursor-pointer"
                  >
                    {value.cuidadorName}
                  </div>
                  <div
                    key={value.bisonId}
                    className="column-admin-bison hover:cursor-pointer"
                  >
                    {value.bisonName}
                  </div>
                </>
              ))}
            </section>
            <div className="report-section-admin">
              <div>
                <button>PDF</button>
                <button>Excel</button>
              </div>
              <br />
              <div className="date-section-container">
                <div className="date-section-admin">
                  <label>Fecha Inicial:</label>
                  <input type="date" />
                </div>
                <div className="date-section-admin">
                  <label> Fecha Final:</label>
                  <input type="date" />
                </div>
              </div>
              <br />
              <div>
                <button>Generar Reporte</button>
              </div>
            </div>
          </main>
        </div>
      </body>
    </>
  );
}

export default Admin;
