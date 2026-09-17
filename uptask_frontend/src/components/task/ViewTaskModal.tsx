import { Fragment, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { editTaskById } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import type { Task } from "@/types";
import { statusTransalations } from "./TaskList";
import { dateFormatter } from "@/utils/utils";

export default function ViewTaskModal() {
  //instancio navigate
  const navigate = useNavigate();

  //instancio useLocation para obtener search y pathname
  const { search, pathname } = useLocation();

  //Obtengo ProjectId -> lo necesita la api fn
  const params = useParams();
  const projectId = params.projectId!;

  //obtengo queryParam | taskId ! para que Ts no se queje lo necesita la api fn
  const taskId = new URLSearchParams(search).get("viewTask")!;
  const show = taskId ? true : false;

  //Implemento useQuery | Get para los detalles de la tarea
  const { data, isError, error } = useQuery({
    queryKey: ["viewTask", taskId],
    queryFn: () => editTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  if (isError) return <Navigate to={`/projects/${projectId}`} />;

  //Aseguramos que existe data
  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => navigate(pathname, { replace: true })}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">Agregada el: {dateFormatter(data.createdAt)} </p>
                    <p className="text-sm text-slate-400">Última actualización: {dateFormatter(data.updatedAt)} </p>
                    <DialogTitle as="h3" className="font-black text-4xl text-slate-600 my-5">
                      {data.name}
                    </DialogTitle>
                    <p className="text-lg text-slate-500 mb-2">Descripción: {data.description}</p>
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado Actual: {statusTransalations[data.status]}</label>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}

/**
 * Trabajamos en hacer reactivo el modal a la URL- la clave= show y onClose | para Show obtenemos el queryParam ?viewTask y lo asignamos a un boolean si existe ese queryParam, si es asi: show | onClose, como hemos hecho, replace:true- valiedonos de navigate()
 *
 * Para manejar el caso en que la tarea sea incorrecta, eje un 1 al final de taskId, lo que vimos en el backend.. si las tareas no existen.=== por eso usamos isError y error de useQuery y lo manejamos con if(....)
 * toast.error(error.message, {toastId:"error"}) el obj toastId:"error" react detecta que hay un toast llamado error y no hace el doble render de react. PERO cuando hice el useEffect porque React daba un error, no hace falta el toastId
 *
 *  enabled:!!taskId, ===> si no hay taskId no hace la query
 *
 * usamos <Navigate/> el componente para cerrar el modal, ahi estamos mandando a user a /projects/projectId.. por que no usamos navigate la Fn ?? porque React se pone loco... asi que usamos eso.. normalmente como sabemos el modal REACCIONA a la URL y para eliminar algo de la URL lo venimos haciendo con la fn navigate(location.pathname, {replace: true}) esto quita la ultima entrada de la URL  pero para el if(isError) react se pone loquito asi que hacemos lo mismo con el componente Navigate.
 *
 *
 *
 * PROBLEMA: el toast aparecía en pantalla, pero sin mensaje (vacío).
 *
 * CAUSA REAL (encontrada con Network > Response, no con Console):
 * El backend, en el catch de validateTask (middleware), devolvía el error
 * con res.status(500).send("Hubo un error") -- .send() manda TEXTO PLANO,
 * no JSON. El frontend esperaba error.response.data.error (un objeto con
 * una propiedad .error adentro), pero como data YA ERA el string plano,
 * esa propiedad no existía -> undefined -> new Error(undefined) -> mensaje vacío.
 *
 * SOLUCION: cambiar .send() por .json({ error: "..." }) en validateTask,
 * para que la forma de la respuesta sea SIEMPRE la misma (un objeto con
 * clave "error"), sin importar en qué punto del backend se dispare el error.
 *
 * REGLA GENERAL: toda respuesta de error de la API debe tener la MISMA
 * forma/contrato en todos los endpoints y catches (siempre .json({error: "..."}),
 * nunca mezclar con .send() de texto plano) -- así el frontend puede leer
 * error.response.data.error de forma confiable, sin sorpresas, sin importar
 * qué controller o middleware disparó el error.
 *
 * DE PASO: distinguimos por qué se disparaba el catch -- Task.findById(taskId)
 * revienta con un CastError de Mongoose cuando el id no tiene formato válido
 * de ObjectId (24 caracteres hex) -- no devuelve null tranquilo, tira excepción,
 * y esa excepción caía en el catch genérico, salteándose el if(!task) que
 * arma el 404 "Tarea no encontrada".
 *
 * Para MOSTRAR los campos de data en el modal, reescribimos el codigo de editTaskById usando el schema de Task en la respuesta de la API- yo al principio habia usado un generic en el useQUery<Task> pero el profesor dice que no es muy recomendado. el generic en useQuery es una anotación de TypeScript que no verifica nada real; safeParse en la función de API es una verificación real de Zod que ocurre en el momento exacto en que el dato llega — por eso el profe prefiere la segunda, es más segura y más centralizada.
 *
 * **
 * DIFERENCIA useQuery vs useMutation -- CUANDO se disparan:
 * 
 * useQuery    -> se dispara AUTOMATICO, apenas el componente se monta 
 *                (o cuando cambia queryKey/enabled). NO lo invoco a mano.
 * useMutation -> se dispara SOLO cuando YO llamo mutate(datos) a mano,
 *                siempre en respuesta a una accion del usuario (submit, 
 *                click, confirm) -- porque recien ahi tengo los datos 
 *                finales y la certeza de que el usuario quiere hacer esa 
 *                operacion.
 * 
 * DIFERENCIA en como se ESCRIBEN mutationFn vs queryFn (por lo anterior):
 * 
 * mutationFn: createTask 
 *   -> referencia DIRECTA, sin () ni argumentos.
 *   -> Los argumentos llegan DESPUES, en el momento de mutate(datos) 
 *      -- por eso no hace falta armar un callback ahora.
 * 
 * queryFn: () => editTaskById({ projectId, taskId })
 *   -> SIEMPRE con arrow function (callback), porque useQuery no me da 
 *      ningun lugar para pasarle argumentos mas adelante (no existe un 
 *      equivalente a mutate() para queries).
 *   -> Como projectId y taskId YA estan disponibles como variables del 
 *      componente en este momento, los "empaqueto" en el callback para 
 *      que se usen cuando React Query decida ejecutar la funcion.
 * 
 * REGLA GENERAL: 
 * si la funcion necesita argumentos que YA tengo ahora -> callback (queryFn).
 * si la funcion va a recibir sus argumentos DESPUES, por otra via (mutate) 
 * -> referencia directa, sin envolver (mutationFn).
 *************************************
 * REESCRIBIMOS el schema de Task en /types/index.ts para agregar los campos createdAt y updatedAt--
 *
 * Usamos nuestra dateFormatter de utils que tiene metodos de Js puros para las fechas.. es un copia y pega.
 *
 *
 *
 *
 */
