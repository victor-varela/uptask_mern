import {Request, Response, NextFunction} from 'express'


export const authenticate = async (req:Request, res:Response, next:NextFunction)=>{
    console.log(req.headers.authorization);

    next()
    

}






/**
 * Este middleware protege las rutas para que los endpoints sean usados por users autenticados
 * Tenemos que enviar en el headers la autorizacion- en postman se hace en : authorization- bearer token | los jwt se envian por bearer | esto lo tenemos que implementar en el frontend--- va a viajar el JWT a traves del header desde axios / react al backend-- aca el middleware lo valida y si esta ok permite a user a entrar al endpoint.-- 
 * Como postman se jodio.. use rest client-- y hay que agregar una linea solamente Authorization: Bearer token-- 
 * 
 * 
 * 
 */