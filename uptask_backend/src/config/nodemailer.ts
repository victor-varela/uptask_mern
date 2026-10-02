import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const config = () => {
  return {
    host: process.env.SMTP_HOT,
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
};
export const transporter = nodemailer.createTransport(config());

/**
 * Para enviar un email hay que llamar a este fn "transport" tenemos que pasar a variables de entorno las credenciales de mailtrap y la confiracion de la fn la guardamos en un objeto y al llamar a la funcion le pasamos la config.
 * 
 * var transport = nodemailer.createTransport({
 * 
 * ////LAS CREDENCIALES LA GUARDAMOS EN UN OBJ CONFIG renombramos transport a transporter y ahi armamos todo 
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "65ac14e72b1a44",
    pass: "092e94ba273af5"
  }
});
 * 
 * export const transporter = nodemailer.createTransport(config());
 * 
 * 
 * En .env las nombramos SMTP_HOST , port, etc.. OJO EL PUERTO DEBE SER UN NUMERO POR ESO EL + PARA CONVERTIR A NUMERO EL SMTP_PORT | en el controller usamos el metodo sendmail de nodemailer.
 * 
 * Como estamos usando varaibles de entorno tenemos que importar dotenv e instanciarlo para que las lea. | import dotenv from "dotenv" | dotenv.config()
 */
