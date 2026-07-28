import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware que verifica si hay errores de validación antes de llegar al controller
export const handlerInputErrors = (req: Request, res: Response, next: NextFunction) => {
  // Extrae los errores de validación que dejó express-validator en el req
  let errors = validationResult(req);
  console.log(errors);

  // Si hay errores, corta el flujo y devuelve 400 con los errores
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Si no hay errores, pasa al siguiente middleware o controller
  next();
};

/**
 * Este middleware son funciones que se ejecutan en las peticiones HTTP.
 * Importamos los types de TS de cada parmetro de la fn. req, re, next
 * Importamos la funcion especial de express-validator = validationResult
 * 
 * 
 * Cómo se conecta con body() en el router:
 * 
        express-validator funciona en dos pasos separados que se conectan a través del objeto req:

        router.post("/",
        body("projectName").notEmpty(),  // Paso 1: valida y guarda errores en req
        body("clientName").notEmpty(),   // Paso 1: valida y guarda errores en req
        handlerInputErrors,              // Paso 2: lee esos errores del req
        ProjectController.createProject  // Solo llega acá si no hay errores
        )

body() no detiene nada por sí solo — solo anota los errores en el req. Luego validationResult(req) los lee de ahí. Por eso necesitás los dos — uno escribe, el otro lee.
 *
 *
 *
 *
 *
 *
 */
