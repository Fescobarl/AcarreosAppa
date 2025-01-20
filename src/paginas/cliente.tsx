import '../cliente.css'
import appaLogo from '/appa.png'


function Cliente() {

  return (
    <>
    <body className='body-cliente'>

    <div className='nav-container'>
    <a href="https://i.pinimg.com/originals/b6/2b/f4/b62bf4d6aa7019de819f80f01667e466.jpg" target="_blank">
      <img src={appaLogo} className="logo-cliente" alt="Appa" /></a>
      <nav className='nav'>  
        <a className='nav-item'>Rastrear acarreo</a>
        <a className='nav-item'>Realizar acarreo</a>
        <a className='nav-item'>Nosotros</a>
      </nav>
    </div>
    <h1>CLIENTE</h1>
    <p>
      Bienvenido a la página del cliente de AcarreosAppa. Aquí podrás encontrar toda la información necesaria para rastrear y realizar tus acarreos de manera eficiente y segura. Nuestro objetivo es ofrecerte un servicio de calidad, con la confianza y seguridad que necesitas para transportar tus bienes. En la sección "Rastrear acarreo", podrás seguir en tiempo real el estado y ubicación de tus envíos. Si deseas realizar un nuevo acarreo, dirígete a la sección "Realizar acarreo" donde podrás ingresar todos los detalles necesarios para programar tu transporte. Además, en la sección "Nosotros", podrás conocer más sobre nuestra empresa, nuestra misión y los valores que nos guían. Gracias por confiar en AcarreosAppa.
    </p>
    </body>
    </>
  )
}

export default Cliente
