import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './paginas/App.tsx'
import Admin from './paginas/admin.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './paginas/login.tsx';
import ProtectedRoute from './paginas/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import Cuidador from './paginas/cuidador.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
},
{
  path: "/cuidador",
  element: <Cuidador />,
},
],},
]
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
