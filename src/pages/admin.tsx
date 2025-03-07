import "../styles/admin.css";
import appa from "/appa.png";
import arrow from "/arrow.png";
import arrow2 from "/arrow (1).png";
import { useState } from "react";

function Admin() {
  const [isOpen, setIsOpen] = useState(true);

  const openCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <body className="body-cliente">
        <div className={`container ${isOpen ? "" : "sidebar-hidden"}`}>
          <header className="header">
            <img src={appa} className="logo" alt="appa logo" />
            <h1>Acarreos App</h1>
          </header>

          <aside className={`sidebar ${isOpen ? "" : "hidden"}`} id="sidebar">
            <img
              src={arrow}
              alt="arrow left"
              onClick={openCloseSidebar}
              className={`arrow ${isOpen ? "" : "hidden"}`}
            />
            <button>Acarreos</button>
            <button>Inventario</button>
            <button>Reporte</button>
          </aside>

          <main className="content">
            <section className="search-section">
              {!isOpen && (
                <img
                  src={arrow2}
                  alt="arrow right"
                  onClick={openCloseSidebar}
                  className="arrow-open"
                />
              )}
              <input type="text" placeholder="Buscador" />
            </section>

            <section className="table-section">
              <div className="column">Appa</div>
              <div className="column">Disponible</div>
              <div className="column">Cuidador 1</div>
              <div className="column">Cuidador 2</div>
              <div className="column">Cuidador 3</div>
              <div className="column">Cuidador 4</div>
              <div className="column">Cuidador 5</div>
              <div className="column">Cuidador 6</div>
              <div className="column">Cuidador 7</div>
              <div className="column">Cuidador 8</div>
              <div className="column">Cuidador 9</div>
              <div className="column">Cuidador 10</div>
              <div className="column">Cuidador 11</div>
              <div className="column">Cuidador 12</div>
              <div className="column">Cuidador 13</div>
              <div className="column">Cuidador 14</div>
              <div className="column">Cuidador 15</div>
              <div className="column">Cuidador 16</div>
              <div className="column">Cuidador 17</div>
              <div className="column">Cuidador 18</div>
              <div className="column">Cuidador 19</div>
              <div className="column">Cuidador 20</div>
              <div className="column">Cuidador 21</div>
              <div className="column">Cuidador 22</div>
              <div className="column">Cuidador 23</div>
              <div className="column">Cuidador 24</div>
              <div className="column">Cuidador 25</div>
              <div className="column">Cuidador 26</div>
              <div className="column">Cuidador 27</div>
              <div className="column">Cuidador 28</div>
            </section>
            <div className="report-section">
              <div>
                <button>PDF</button>
                <button>Excel</button>
              </div>
              <br />
              <div className="date-section-container">
                <div className="date-section">
                  <label>Fecha Inicial:</label>
                  <input type="date" />
                </div>
                <div className="date-section">
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
