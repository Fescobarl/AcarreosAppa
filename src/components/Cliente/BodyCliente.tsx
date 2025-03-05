import Footer from "../Footer";
import { Cliente, Cuidador } from "../../services/types/models";
import NewAcarreo from "../Acarreo/NewAcarreo";
import Cotizar from "../Acarreo/Cotizar";

interface BodyClienteI {
  usuario: Cliente | Cuidador;
  logout: () => void;
}

const BodyCliente = ({ usuario }: BodyClienteI) => {
  return (
    <div className="body-cliente">
      <div className="main-container space-y-16 flex-col flex mx-auto">
        <NewAcarreo usuario={usuario} />
        <Footer />
      </div>
    </div>
  );
};

export default BodyCliente;
