import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export const AppLayout = () => {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
          <NavMenu/>
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        {/* Yo tengo hijos | Van en Outlet */}
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
      </footer>
      {/* Componente Toast */}
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
};

/**
 * Como este componente tiene HIJOS los hijos se inyectan en OUTLET
 * Estilos: tienes la referencias_ui Es el layout general
 *
 * El componente de react-toastify 'ToastContainer' lo ponemos aca porque es nuestro layout principal, si ves el proyecto hace sentido que se estacione aqui y luego la funcion va cuando sea necesario --OJO la importacion de la hoja de estilos es importante==== 
import 'react-toastify/dist/ReactToastify.css' esta linea no la encontre a simple vista en la documentacion.. Le pasamos props al ToastContainer para que no se detenga en hover ni en focus. OJO= la linea no esta en la doc porque se actualizo la libreria, lo probe sin la linea y funciona igual.. bien victorino!! 
 *
 *
 *
 *
 */
