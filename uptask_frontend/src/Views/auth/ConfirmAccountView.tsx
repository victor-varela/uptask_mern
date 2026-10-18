import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  //creamos state para el pin
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  //instanciamos mutation
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
    },
  });
  const handleComplete = (token: ConfirmToken["token"]) => {
    //llamar a la mutacion- si lo envio solo token me dice: Argument of type 'string' is not assignable to parameter of type 'ConfirmToken' | el type que le aignamos es un objeto, por eso hay que eviarlo {token} como se llaman iguales funciona, sino tambien seria {token:token}
    mutate({ token });
  };
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/new-code" className="text-center text-gray-300 font-normal">
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}

/**
 * Chakra-ui/pin-input usa onCompleted y onChange-- con eso guaradamos en un state el pin que ingresa user. | en la documentacion de chakra-ui esta el ejemplo, dice el value={} onChange, onCompleted | OJO la hanldeComplete tiene que llevar token como argumento para que tome hasta el ultimo digito..
 * 
 * Nos damos cuenta que el argumento 'token' lo usamos en varias funciones y le asignamos un type:string... ENTONCES lo agregamos en los types globales /src/types.ts en los types a partir de AuthSchema en el type Auth-- recuerda, primero el schema y luego el type.. | el type es un objeto con la propiedad que estamos pickeando, por eso en la asignacion de los types de este archivo usamos la forma ConfirmToken["token"] ==> porque con lookup indicamos la propiedad token de ese OBJETO ConfirmToken.. es un type pero si hovereas ves que es un objeto ==>
 *  type ConfirmToken = {
                    token: string;
                    }
 * 
 * En realidad todos los types son objetos.. esto es importante a la hora de el envio de los datos entre funciones, en la mutacion se envia como {token} para que acceda a esa propiedad. En las otras mutaciones, el argumento que le enviabamos venia de formData que eso lo maneja react-hook-form y devuelve un objeto directamente por eso no le enviaba con llaves {} en la mutacion. En este caso el objeto lo armo yo mismo a mano, por eso las llaves {}
 * 
 */
