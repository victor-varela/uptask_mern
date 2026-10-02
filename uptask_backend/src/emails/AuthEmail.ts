import { transporter } from "../config/nodemailer";

interface IUser {
  email: string;
  token: string;
  name: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user:IUser) => {
   await  transporter.sendMail(
      {
        from: "UpTask <admin@uptask.com>",
        to: user.email,
        subject: "UpTask - Confirma tu cuenta",
        text: "UpTask- Confirma tu cuenta",
        html: `<p>Hola ${user.name}, has creado tu cuenta en Uptask.</p>

        <p>VIsita el siguiente enlace:</p>
        <a href="">Confirmar cuenta</a>
        <p>Ingresa el codigo: <b>${user.token}</b></p>
        <p>El codigo expira en 10 minutos</p>
        `,
      },
      (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("MAILTRAP Message sent: %s", info.messageId);
      },
    );
  };
}


/**
 * Yo habia hecho la funcion asi:  static SendConfirmationEmail = async ({ email, name, token }:IUser) => | con cada campo como si fueran props.. pero el profe lo hizo asi static SendConfirmationEmail = async (user:IUser) es mas lindo. pero la razon es que si crece el objeto que estamos manejando solo lo tenemos que agregar al interface y dentro accedemos con punto .projectName por ejemplo. asi que uso la version del profe
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */