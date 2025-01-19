import appaLogo from '/appa.png'
import '../App.css'
import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user === 'cliente' && password === 'cliente') {
      auth.isAuth = true;
      setRedirectTo('/app');
    } else if (user === 'cuidador' && password === 'cuidador') {
      auth.isAuth = true;
      setRedirectTo('/cuidador'); // Asume que existe esta ruta
    } else if (user === 'admin' && password === 'admin') {
      auth.isAuth = true;
      setRedirectTo('/admin');
    } else {
      alert('Credenciales incorrectas');
    }
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

    return (
    <>
      <div>
        <a href="https://i.pinimg.com/originals/b6/2b/f4/b62bf4d6aa7019de819f80f01667e466.jpg" target="_blank">
          <img src={appaLogo} className="logo" alt="Appa" />
        </a>
      </div>
      <p className='nota'><strong>user:</strong> cliente , <strong>user:</strong> cuidador, <strong>user:</strong> admin <br></br>
      <strong>#las contraseñas son el mismo user</strong>
      </p>
      <h1>Login</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          User:</label>
        <input type="text" name="user" value={user} onChange={(e) => setUser(e.target.value)} />
        <label>
          Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="https://media.tenor.com/aSkdq3IU0g0AAAAM/laughing-cat.gif" target="_blank">No tengo una cuenta</a>
        <div className='espacio'> </div>
        <button className='button'>Entrar</button>
      </form>

    </>
  )
}

export default Login