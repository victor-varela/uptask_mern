import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthAPI";
import { toast } from "react-toastify";


export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  

  const { mutate } = useMutation({
    mutationFn: login,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      navigate("/");
      // reset()
    },
  });

  //prevenir envio de form vacio | parece que fuerza un render watch solo sin asignacion
  // watch()

  const handleForm = (formData: UserLoginForm) => {
    //le pasamos formData que lo maneja react-hook-form. Ya lo entrega como objeto, no es necesario las llaves {}

    mutate(formData);
  };

  return (
    <>
    <h1 className="text-5xl font-black text-white">Iniciar Sesion</h1>
      <p className="text-2xl font-light text-white mt-5">
        LLena el formulario {""}
        <span className=" text-fuchsia-500 font-bold"> e inicia sesion</span>
      </p>
      <form onSubmit={handleSubmit(handleForm)} className="space-y-8 p-10 mt-10 bg-white" noValidate>
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to={"/auth/register"} className="text-center text-gray-300 font-normal">
          ¿No tienes cuenta? Crear Una
        </Link>
        <Link to={"/auth/forgot-password"} className="text-center text-gray-300 font-normal">
          ¿Olvidaste tu password? Reestablecer
        </Link>
      </nav>
    </>
  );
}


/*
 Esta vista me dio un bug: despues de un submit exitoso, usando reset, si volvia a hacer submit (con el form vacio) DEJABA PASAR LA ACCION CON LOS CAMPOS VACIOS, lo cual retornaba un error que el toast no tiene escrito porque mi backend no lo contempla es un error 400 'algo asi'... estuve varias sesiones viendo que podia ser aunque se que la funcionalidad es que una vez que sea un login correcto usar navigate para enviar a dashboard pero igual me intrigaba por que pasaba. asi que busque en RegisterView que tambien tiene un reset a ver por que ahí si funciona bien la barrera de hook-form para evitar enviar form vacio y con Claude vimos que una diferencia entre ambos componentes es que registerView tiene un watch para el password-- asi que en LoginView simplemente inicialice el watch.. lo llame si asignarle variable ==> watch() y ahi quedó, cuando intento enviar un form vacio ahí hook-form trabaja bien | la explicacion no es del todo concreta pero algo con los renders tiene que ver... si refrescaba la pagina hook-form vuelve a registrar los campos y tiene la guardia alta pero si enviaba form y sin refrescar volvia hacer submit me dejaba pasar todo fabian barthez.. jeje
 * 
 * 
 * 
 * 
 * 
 * 
 */ 