import { Fragment } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";


export default function ViewTaskModal() {

    //instancio navigate
    const navigate = useNavigate()

    //instancio useLocation para obtener search y pathname
    const {search, pathname} = useLocation()

    //obtengo queryParam
    const queryParam = new URLSearchParams(search).get('viewTask')
    console.log(queryParam);
    
    const show = queryParam? true: false
    console.log(show);
    
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(pathname, {replace:true})}>
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
                  <p className="text-sm text-slate-400">Agregada el: </p>
                  <p className="text-sm text-slate-400">Última actualización: </p>
                  <Dialog.Title as="h3" className="font-black text-4xl text-slate-600 my-5">
                    Titulo aquí
                  </Dialog.Title>
                  <p className="text-lg text-slate-500 mb-2">Descripción:</p>
                  <div className="my-5 space-y-3">
                    <label className="font-bold">Estado Actual:</label>
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