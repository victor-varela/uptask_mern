import server from "./server"; //el export default de server es app. Aca le cambio el nombre porque hace mas sentido y asi se ejecuta todo el codigo en server inmediatamente
import colors from "colors";

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(colors.cyan.bold(`REST API corriendo en el puerto ${port}`)); //esto es lo que ARRANCA EL SERVIDOR 'LISTEN'
});

/**
 * El motivo por el cual se ejecuta el código de server.ts al importar app en index.ts es debido al comportamiento de Node.js al manejar los módulos.

Cuando importas un archivo en Node.js (en este caso, server.ts), todo el código de ese archivo se ejecuta inmediatamente en el momento de la importación, no solo lo que exportas.

Esto significa que aunque en server.ts solo estés exportando app, cualquier código que no esté dentro de una función o clase y que se encuentre al nivel superior de ese archivo (como inicializaciones, configuraciones, o cualquier otro bloque de código), se ejecutará tan pronto como ese archivo sea importado en otro archivo, como en tu index.ts. Por eso se ejecuta:


                                dotenv.config()

                                connectDB()

 * 
 * 
 * La lógica de separación es:
    server.ts  →  "qué es y cómo se configura" la app
    index.ts   →  "dónde corre" (puerto y arranque)
 * 
 * 
 * 
 * 
 * 
 */
