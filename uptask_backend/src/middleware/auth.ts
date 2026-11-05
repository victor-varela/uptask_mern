import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }

  const token = bearer.split(" ")[1];

  //decodificamos el token | Usamos el metodo de JWT - verify (token, secretKey) sale hoverando | vamos a la DB -> tryCatch - buscamos user por id |
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Aseguramos la condicion que debe tener decoded y si es asi--> Error
    if (typeof decoded === "object" && decoded.id) {
      //instaciamos user - vamos a la DB - await | buscamos por id
      const user = await User.findById(decoded.id);
      console.log(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Token no valido" });
  }

  next();
};

/**
 * Este middleware protege las rutas para que los endpoints sean usados por users autenticados
 * Tenemos que enviar en el headers la autorizacion- en postman se hace en : authorization- bearer token | los jwt se envian por bearer | esto lo tenemos que implementar en el frontend--- va a viajar el JWT a traves del header desde axios / react al backend-- aca el middleware lo valida y si esta ok permite a user a entrar al endpoint.-- 
 * Como postman se jodio.. use rest client-- y hay que agregar una linea solamente Authorization: Bearer token-- | Asi se envian los headers de autorizacion desde Rest Client-
 * 
 * El token viaja por el headers y esta despues de la palabra Bearer (es una convencion) entonces hacemos split(' ')[1] para capturar lo que esta despues de bearer y eso es el valor de token.
 * 
 * Una vez mas se ve el valor del objeto request == en req.headers.authorization es que viaja el token-
 * 
 * decoded.id == ts se queja: Property 'id' does not exist on type 'string | JwtPayload'.
  Property 'id' does not exist on type 'string ¿que hacer? asegurarle que ese id existe. Sabemos que decoded devuelve un objecto con un id porque es lo que devolvemos en el controller : const token = generateJwt({id: user._id}); --> entonces lo aseguramos con codigo- 
  
            typeOf decoded === Object && decoded.id
 * 
 *
 * jwt.verify toma 2 argumentos el token que va a decodificar y la secretKey -- esa esta en .env
 *  
 */
