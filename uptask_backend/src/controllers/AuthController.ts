import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { checkPassword, passwordHash } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { body } from "express-validator";
import generateJwt from "../utils/jwt";

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
      //asignamos a user con user._id recien instanciado para saber de quien es el token| esto lo usaremos para confirmar user en la consulta const user = await User.findById(tokenExist.user) en el metodo confirmAccount
      token.user = user._id;

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
        return res.status(404).json({ error: error.message });
      }

      //buscamos el user que coincide con el id
      const user = await User.findById(tokenExist.user); //esto funciona porque token.user = user._id

      //cambiamos confirmed: true | Es la razon de ser de esta Funcion |
      user.confirmed = true;

      //eliminamos el token todo ese objeto que esta instanciado en tokenExist y guardamos user con el nuevo campo actualizado todo en una sola con Promise.allSetled
      await Promise.allSettled([user.save(), tokenExist.deleteOne()]);

      //retornamos algo para que se entere el frontend jeje
      return res.send(`${user.name} cuenta confirmada correctamente`);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static Login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      //verificar si user existe
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      //verificar si esta confirmado
      if (!user.confirmed) {
        //como no esta confirmado le enviamos un nuevo token- lo que hicimos en createAccount

        //Creamos token- instanciamos el modelo ¿que necesita? un token y un user- id de user(asi esta en el modelo)
        const token = new Token();

        //asignamos ya que esta instaciado el modelo.. no hay que crear una variable nueva
        //generamos token con la fn
        token.token = generateToken();
        //asignamos a user con user._id recien instanciado para saber de quien es el token
        token.user = user._id;
        //guardo el token
        await token.save();

        //enviamos el email - Usamos la el metodo de la class AuthEmail
        await AuthEmail.sendConfirmationEmail({ email: user.email, token: token.token, name: user.name });

        const error = new Error("La cuenta no ha sido confirmada, hemos enviamos un nuevo email");
        res.status(401).json({ error: error.message });
      }

      //verificar si el password es correcto(bcrypt)el orden de los argumentos es 1-el plainPassword 2-el passwordHash
      const match = await checkPassword(password, user.password);
      if (!match) {
        const error = new Error("El password es incorrecto");

        return res.status(401).json({ error: error.message });
      }

      //Es hora de JWT para Autenticar
      const token = generateJwt();

      res.send(token);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  //este metodo es muy similar a crear cuenta porque involucra el envio de emal, verificacion de user.. etc | vericamos su email, es lo que necesita para avanzar. ya esta registrado asi que ya tiene un password.
  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body; //extraer solo lo que permitimos | no puede recibir role:"admin" o confirmed, etc.. esos son campos que decide el servidor si un atacante envia confirmed true y lo extraigo le estoy dando toda la cancha para que entre

      //Verificamos si esta registrado | usamos el Modelo User lo que nos da mongoose para hacer facil las consultas. El email es unico
      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      //Para evitar enviar codigos a user que estan confirmados
      if (user.confirmed) {
        const error = new Error("El usuario ya esta confirmado");
        return res.status(409).json({ error: error.message });
      }

      //Ya verificamos que esta registrado - Creamos token- instanciamos el modelo ¿que necesita? un token y un user- id de user(asi esta en el modelo)
      const token = new Token();

      //asignamos igual que en user ya que esta instaciado el modelo.. no hay que crear una variable nueva
      //generamos token con la fn
      token.token = generateToken();
      //asignamos a user con user._id recien instanciado para saber de quien es el token| esto lo usaremos para confirmar user en la consulta const user = await User.findById(tokenExist.user) en el metodo confirmAccount
      token.user = user._id;

      //enviamos el email - Usamos la el metodo de la class AuthEmail
      await AuthEmail.sendConfirmationEmail(
        { email: user.email, token: token.token, name: user.name },
        { isResend: true },
      );

      //Guardo nuevo token |
      await token.save();
      res.send("Enviamos un nuevo codigo a tu email");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  //este metodo es muy similar al de reenviar codigo para confirmacion pero no necesita verificar si user esta confirmado
  static requestResetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body; //extraer solo lo que permitimos | no puede recibir role:"admin" o confirmed, etc.. esos son campos que decide el servidor si un atacante envia confirmed true y lo extraigo le estoy dando toda la cancha para que entre

      //Verificamos si esta registrado | usamos el Modelo User lo que nos da mongoose para hacer facil las consultas. El email es unico
      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      //Ya verificamos que esta registrado - Creamos token- instanciamos el modelo ¿que necesita? un token y un user- id de user(asi esta en el modelo)
      const token = new Token();

      //asignamos igual que en user ya que esta instaciado el modelo.. no hay que crear una variable nueva
      //generamos token con la fn
      token.token = generateToken();
      //asignamos a user con user._id recien instanciado para saber de quien es el token| esto lo usaremos para confirmar user en la consulta const user = await User.findById(tokenExist.user) en el metodo confirmAccount
      token.user = user._id;

      //enviamos el email - Usamos el metodo de la class AuthEmail para ello es un metodo diferente a confirmation
      await AuthEmail.sendResetPasswordEmail({ email: user.email, token: token.token, name: user.name });

      //Guardo nuevo token |
      await token.save();
      res.send("Enviamos un nuevo codigo a tu email");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  //Validar token para reestablecer password
  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const tokenExist = await Token.findOne({ token });

      if (!tokenExist) {
        const error = new Error("El token no es valido");
        return res.status(404).json({ error: error.message });
      }

      res.send("Codigo valido. Define tu nuevo password");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updatePasswordWithToken = async (req: Request, res: Response) => {
    //A pesar de que viajan password y password_confirmation usamos solo password para las operaciones en la DB

    //leemos el token que viene en la URL -- lo vamos a necesitar mas adelante como una mouskHerramienta | el token tiene un user asociado.

    try {
      const { token } = req.params;

      const tokenExist = await Token.findOne({ token });

      if (!tokenExist) {
        const error = new Error("El token no es valido");
        return res.status(404).json({ error: error.message });
      }

      //Paso validacion. Token valido | leemos la nueva password y escribimos en la DB

      //Instacio User para saber a que usario asignar la nueva password | esta es la mouskherramienta
      const user = await User.findById(tokenExist.user);

      //Leo password
      const { password } = req.body;

      //Asignamos a user el valor del hash de password nuevo. es await porque demora, es encriptacion
      user.password = await passwordHash(password);

      //Escribimos en DB | guardar User y eliminar Token
      await Promise.allSettled([user.save(), tokenExist.deleteOne()]);

      res.send("Password creado correctamente");
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
 * Es CONVENIENTE darse cuenta que hace cada metodo del controlador: en createAccount: prevenimos duplicados, creamos user, hasheamos password, creamos token, asignamos el token a un user, enviamos email. En confirmAccount: validamos si el token existe, buscamos usuer, cambiamos confirmed a true. EN login: revisamos si user existe, si esta confirmado y si el password es correcto. 
 * 
 * El chequeo del password lo habia hecho directamente en este arhivo, el profe lo hace desde /utils/auth.ts --> 
 * 
 * OJO: sintaxis-- findById no recibe un Object | findOne SI recibe un Object
 * OJO: siempre try catch en los controllers! | SI VOY A LA DB SIEMPRE AWAIT SIEMPRE AWAIT | SI USO UN MODELO ---AWAIT-- 
 *
 */
