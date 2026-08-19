import { deleteProject, getProjects } from "@/api/ProjectAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardView() {
  //Implementamos invalidateQueries para refrescar el state
  const queryClient = useQueryClient();
  //Implementamos useQuery-> Obtener Projectos
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  //Implementamos useMutation-> Eliminar Projecto
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      //refrescamos /reFetch otro fecth state usando invalidateQueries
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(data);
    },
  });

  if (isLoading) return "cargando...";

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Mis proyectos</h1>

        <p className="text-2xl font-light text-gray-500 mt-5">Administra tus proyectos</p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 cursor-pointer text-2xl text-white font-bold px-10 py-3"
            to="/projects/create"
          >
            Crear Proyecto
          </Link>
        </nav>
        {data.length ? (
          <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
            {data.map(project => (
              <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <Link to={`/projects/${project._id}`} className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold">
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">Cliente: {project.clientName}</p>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                          <Link to={`/projects/${project._id}`} className="block px-3 py-1 text-sm leading-6 text-gray-900">
                            Ver Proyecto
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={`/projects/${project._id}/edit`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Editar Proyecto
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => {
                              if (window.confirm(`¿Confirmas que quieres eliminar: ${project.projectName}?`)) {
                                mutate(project._id);
                              }
                            }}
                          >
                            Eliminar Proyecto
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No hay proyectos {""}
            <Link to="/projects/create" className="text-fuchsia-500 font-bold">
              Crear Proyecto
            </Link>
          </p>
        )}
      </>
    );
}

/**
 * Esta vista es HIJA de AppLayout por eso AppLayout lleva OUTLET
 * 
 * Usamos Link de react-router-dom para llevar a otra pagina- De nuevo, el router es quien manda-- cada link en una view debe estar en el router-- asi es la dinamica: hacemos una vista-> presentamos datos-> capturamos datos-> llevamos a otra pagina(ROUTER), etc etc Aca llevo a user a CREAR PROYECTO, seguramente cuando hayan proyectos van a aparecer aqui pero siguiendo el CRUD primero es CREAR-
 * La cuestion es saber diferenciar CUANDO crear un vista--> aca llevamos a user a una pagina asi que tal vez se puede decir que si llevamos a un lugar eso lo tenemos que crear como vista y lo hacemos en las carpetas correspondientes Views/CreateProjectView.tsx

- Para consultar a la API con useQuery tenemos que pasar la queryKey que es lo Escencial de esta herramienta useQuery porque esa key permite cachear en memoria del cliente lo que trae esa consulta a la api por lo cual te ahorras un monton de consultas y es mas veloz para trabajar esos datos en la app. Es una key unica para cada consulta, es excelente una gran ventaja tenerlo. Despues definimos la funcion que va a manejar la consulta a al api : getProjects que la definimos en ProjectApi.

Usamos if (data) antes del return del componente por recomendacion de useQuery--> tambien se pude hacer con el optional chaining ? pero no queda tan cheto... 







 */
