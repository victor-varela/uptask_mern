import { request, response, Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handlerInputErrors } from "../middleware/validation";

const router = Router();

//Peticion de prueba
router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").toLowerCase().isEmail().withMessage("Email no valido"),
  body("password").isLength({ min: 8 }).withMessage("El password debe tener minimo 8 caracteres"),
  body("password_confirmation").custom((value, {req})=>{
    if(value !== req.body.password){
        throw new Error("El password no coincide")
    }
    return true
  }),
  handlerInputErrors,
  AuthController.CreateAccount,
);

export default router;

/**
 * Los router los conectamos a la app desde server.. ahi los llamamos
 * Como esta ruta es nueva, nos da error de cors | -- creamos un nuevo script en package json dev:api con la variable o bandera --api y verificamos esa variable en la configuracion de cors, si estamos en modo desarrollo con api de prueba habilitamos el origin que en estas herramientas como postman, thunderclient, restclient es "undefined".
 *
 * Para crear una cuenta necestiamos name, email, password, esto lo validamos ANTES de que entre al endpoint con express validator (la fn body). todo eso lo recuperamos desde el body de la request.
 *
 * la funcion custom() de express validator permite recuperar el value, es decir, el input y con req accedemos a las propiedades que queramos del body, en este caso comparo el value de password_confirmation con password para validar que sean iguales. IMPORTANTE el return true en la comprobacion de la fn custom para que vaya al siguiente middleware el codigo.
 *
 */
