import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { passwordHash } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transporter } from "../config/nodemailer";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body; //extraer solo lo que permitimos | no puede recibir role:"admin" o confirmed, etc.. esos son campos que decide el servidor si un atacante envia confirmed true y lo extraigo le estoy dando toda la cancha para que entre

      //Prevenir user duplicados | usamos el Modelo User lo que nos da mongoose para hacer facil las consultas. El email es unico
      const userExists = await User.findOne({ email });

      if (userExists) {
        const error = new Error("El usuario ya esta registrado");
        return res.status(409).json({ error: error.message });
      }

      //Crea un usuario
      const user = new User({ email, password, name });

      //Hashear Password ==>Reasignamos user.password al valor de la util fn | es async porque bcrypt hace trabajo pesado de encriptacion y hay que esperarlo
      user.password = await passwordHash(password);

      //Creamos token- instanciamos el modelo ¿que necesita? un token y un user- id de user(asi esta en el modelo)
      const token = new Token();

      //asignamos igual que en user ya que esta instaciado el modelo.. no hay que crear una variable nueva
      //generamos token con la fn
      token.token = generateToken();
      //asignamos a user con user._id recien instanciado
      token.user = user._id;

      console.log(transporter, "transporter...");

      //enviamos el email - Usamos la el metodo de la class AuthEmail
      await AuthEmail.sendConfirmationEmail({ email: user.email, token: token.token, name: user.name });

      //Guardo nuevo User. Guardamos user en la DB con el nuevo valor de password y guardo nuevo token | Promise.allSettled para hacerlo en un solo paso
      await Promise.allSettled([user.save(), token.save()]);
      res.send("Revisa tu email para confirmar tu cuenta");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      //extraer token
      const { token } = req.body;

      //validamos si existe
      const tokenExist = await Token.findOne({ token });

      if (!tokenExist) {
        const error = new Error("EL token no es valido");
        return res.status(401).json({ error: error.message });
      }

      //buscamos el user
      const user = await User.findById(tokenExist.user);

      //cambiamos confirmed: true | Es la razon de ser de esta Funcion |
      user.confirmed = true;

      //eliminamos el token todo ese objeto que esta instanciado en tokenExist y guardamos user con el nuevo campo actualizado todo en una sola con Promise.allSetled
      Promise.allSettled([user.save(), tokenExist.deleteOne()]);
      
      //retornamos algo para que se entere el frontend jeje
      return res.send(`${user.name} Cuenta confirmada correctamente`)
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}

/**
 * fijate este json que envie y el backend NO lo esta tomando, NO contamina la DB porque NO tomo ese campo confirmed para enviar a la DB:
 *  
 * 
 * {
  "name": "victor",
  "email": "correo@correo.com",
  "password": "password",
  "password_confirmation":"password",
  "confirmed":true | este confirmed true nunca se toma en cuenta en el controller.
}
 * Para el salt, yo le asigne directamente el valor de 10. El profe lo hizo con un await y genSalt- no se cual es mejor
 * 
 * La asignacion token.user = user._id al principio parecia extraño ya que user no se ha guardado en la DB y pensaba que era ahí cuando user tenia un id. PERO la verdad es que mongo asigna los id's al momento de la instanciacion en local, usa como un timestamp + datos la maquina + otras cosas lo que permite que ya desde que lo instancié (lo invoqué) tendo un id 
 * 
 */
