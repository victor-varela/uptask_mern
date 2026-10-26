import { useState } from "react";
import NewPasswordToken from "./components/NewPasswordToken";
import NewPasswordForm from "./components/NewPasswordForm";

export default function NewPasswordView() {
  // renderizamos dependiendo si el token es valido o no
  const [isValidToken, setIsValidToken] = useState(false);

  const intro = isValidToken? "Completa el formulario" : "Ingresa el codigo que recibiste"
  const highlight = isValidToken ? "para cambiar tu password" : "por email"

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">{intro}{" "}
        <span className=" text-fuchsia-500 font-bold">{highlight}</span>
      </p>

      {/* si es valido el token que ingresa user renderizo el formulario */}
      {isValidToken ? <NewPasswordForm/> : <NewPasswordToken/>}
    </>
  );
}

/**
 * Usamos rederizado condicional atado a si el token es valido-- tenemos que tomar el token de user-- tocar el endpoint que lo valida -- recibir la respuesta y dependiendo si es valido renderizar componente para crear nuevo password
 *
 *
 *
 *
 */
