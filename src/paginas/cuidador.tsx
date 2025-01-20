import '../cuidador.css'
import mapa from '/mapa.jpg'


function Cuidador() {

  return (
    <>
      <body className='body-cuidador'>
        <div className='fondo-cuidador'>
          <div className='boton-container'>
          <button className='boton-generico'><strong>Mis acarreos</strong></button>
          </div>
          <img className='mapa' src={mapa} alt="map" />
          <div className='boton-container'>
          <button className='boton-generico'><strong>Actualizar mi ubicacion</strong></button>
          <div className='fondo-extras'>
            <button className='boton-generico'><strong>Estado</strong></button>
            <button className='boton-terminar'><strong>Terminar</strong></button>
          </div>
          </div>
        </div>
      </body>
      
    </>
  )
}

export default Cuidador
