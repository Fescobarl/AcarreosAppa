import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Admin from './paginas/admin.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './paginas/login.tsx';
import ProtectedRoute from './paginas/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import Cuidador from './paginas/cuidador.tsx'
import Cliente from './paginas/cliente.tsx'

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
        path: "/cliente",
        element: <Cliente />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/cuidador",
        element: <Cuidador />,
      },
              ],
  },
                                  ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
