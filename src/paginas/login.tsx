import appaLogo from '/appa.png'
import '../App.css'

function Login() {

  return (
    <>
      <div>
        <a href="https://i.pinimg.com/originals/b6/2b/f4/b62bf4d6aa7019de819f80f01667e466.jpg" target="_blank">
          <img src={appaLogo} className="logo" alt="Appa" />
        </a>
      </div>
      <h1>Login</h1>
      <form className='form'>
        <label>
          Email:</label>
        <input type="email" name="email" />
        <label>
          Password:</label>
        <input type="password" name="password" />
        <a href="https://media.tenor.com/aSkdq3IU0g0AAAAM/laughing-cat.gif" target="_blank">No tengo una cuenta</a>
        <div className='espacio'> </div>
        <button className='button' type="submit">Entrar</button>
      </form>

    </>
  )
}

export default Login