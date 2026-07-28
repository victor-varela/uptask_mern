import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [process.env.FRONTEND_URL];
    //verificamos
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

/**
 * Importamos el type de corsOptions y lo usamos para crear la configuracion de cors que luego vamos a usar en server.ts
 * En la documentacion La configuracion no la encontre exactamente como la hizo el profe OJO--  asi esta en la Documentacion:
 *  
 * var corsOptions = {
  origin: function (origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    db.loadOrigins(function (error, origins) {
      callback(error, origins)
    })
  }
}
 * Creamos un arreglo con los origins que permitimos, lo hacemos con variables de entorno. 'whitelist' el valor de origin en la function lo extrae la libreria cors automaticamente.. esa es una de sus ventajas entonces lee el origin del header y lo compara com MI lista de permitidos_

 * CORS                    → protege al navegador, decide si MUESTRA la respuesta (UX/seguridad débil)
express-validator        → valida formato de los datos que entran (isMongoId, notEmpty, isIn, etc.)
Mass Assignment guard    → extraer solo campos permitidos del body, no pasar req.body directo
Autorización (project    → verificar que el recurso pertenece a quien dice que pertenece
  belongsTo checks)
 * 
 */
