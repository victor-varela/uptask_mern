import { Link } from "react-router-dom";
export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Administra tus proyectos</p>
      <nav className="my-5">
        <Link className="bg-purple-400 hover:bg-purple-500 cursor-pointer text-2xl text-white font-bold px-10 py-3" to="/projects/create">Crear Proyecto</Link>
      </nav>
    </>
  );
}

/**
 * Esta vista es HIJA de AppLayout por eso AppLayout lleva OUTLET
 * 
 * Usamos Link de react-router-dom para llevar a otra pagina- De nuevo, el router es quien manda-- cada link en una view debe estar en el router-- asi es la dinamica: hacemos una vista-> presentamos datos-> capturamos datos-> llevamos a otra pagina(ROUTER), etc etc Aca llevo a user a CREAR PROYECTO, seguramente cuando hayan proyectos van a aparecer aqui pero siguiendo el CRUD primero es CREAR-
 * La cuestion es saber diferenciar CUANDO crear un vista--> aca llevamos a user a una pagina asi que tal vez se puede decir que si llevamos a un lugar eso lo tenemos que crear como vista y lo hacemos en las carpetas correspondientes Views/CreateProjectView.tsx










 */
