import type { Task } from "@/types";
import {Fragment} from "react"
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react"
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid"
import { useNavigate } from "react-router-dom";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate()
  return (
    <li className=" p-5 bg-white border-slate-300 gap-3 flex justify-between">
      <div className="min-w-0 flex flex-col gap-y-4">
        <button type="button" className="text-xl font-bold text-slate-600 text-left">
          {task.name}
        </button>
        <p className="text-slate-500">{task.description}</p>
      </div>
      <div className="flex shrink-0  gap-x-6">
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
                <button type="button" className="block px-3 py-1 text-sm leading-6 text-gray-900">
                  Ver Tarea
                </button>
              </MenuItem>
              <MenuItem>
                <button 
                type="button" 
                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                onClick={()=> navigate(location.pathname + `?editTask=${task._id}`)}
                >
                  Editar Tarea
                </button>
              </MenuItem>

              <MenuItem>
                <button type="button" className="block px-3 py-1 text-sm leading-6 text-red-500">
                  Eliminar Tarea
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}

/**
 *  En el button editar tarea pasamos parametro de la url que vamos a capturar luego en el componente para edicion- usamos 
 * useNavigate()- useNavigate nos permite colocar en la URL parametros, cosas, ciertos valores UN QUERY STRING! un queryString es una combinacion entre la URL actual y el parametro (editTask) con ? es que diferenciamos el parametro que estamos inyectando.. para obtener la URL actual usamos location.pathname | AL hacer click entonces en editar tarea lo que va a pasar es que en la URL actual se agrega el task._id http://localhost:5173/projects/6a450aa1704fcdba970a4248?editTask=6a450bf0704fcdba970a424f
 * Para la edicion necesitamos 2 componentes : EditTaskModal que funciona igual que AddTaskModal --> depende de la lo que ete en la URL para mostrarlo 'show' y otro componente EditTaskData para desde ahi hacer las mutations las llamadas a la API.
 * EditTaskData es quien renderiza el modal en caso de que se encuentre la informacion. por ahora no entiendo mucho la dinamica pero avanzo..  
 * En ProjectDetails agregamos despues de AddTaskModal --> EditTaskData --> este editData es quien hace la consulta.. si encuentra algo entonces DISPARA EL MODAL DE EDICION | Primero consulto, tomando el id de la URL y si encuentra algo DISPARA el modal para editar- ahora si entendi jeje para ello tenemos que RECUPERAR el id en EditTaskData .. 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */