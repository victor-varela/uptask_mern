import jwt from "jsonwebtoken";
import {Types} from "mongoose";

type UserPayload= {
  id:Types.ObjectId
};
const generateJwt = (payload:UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });

  return token;
};

export default generateJwt;

/**
 * .sign toma 3 argumentos payload, secret_key, options
 * ExpiresIn 180d son 180 dias
 * un jwt se ve asi: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmljdG9yIiwiY3JlZGl0X2NhcmQiOiIxMjM0NTY0NjQiLCJpYXQiOjE3OTM0NTgxMDAsImV4cCI6MTc5MzQ1ODQ2MH0.TUaP0A3DxyUU1T23gBhRKTJuz-IaJhm8s3QucS593Bs
 *  Tiene 3 partes HEADER PAYLOAD SIGNATURE | estan separados por . en la cadena
 * Usamos el id de user como payload. es lo minimo que requiere DB - el servidor - para identificar a un usario | debemos tiparlo => ObjectId de mongoose -
 *
 *  Esta fn espera un objeto con property id y type ObjectId
 * 
  // desestructuración: saco `id` del objeto que llega
({ id }: { id: Types.ObjectId }) => ...

// lo tuyo: recibo el objeto entero como `payload`
(payload: { id: Types.ObjectId }) => ...
 * ¿Que espera la funcion? un objeto --- le llamo payload | de que tipo o que forma tiene ese objeto? -- tiene un id de tipo objectId -- por que recibe un objeto? porque JWT.sign espera un Objeto.. asi que en alguna parte se debe formar ese objeto.. lo verifique leyendo la documentacion y esto fue lo que encontre: Sí, es lo mismo que te decía. Esa frase de la documentación lo confirma.

jwt.sign acepta tres tipos de payload: objeto, string o Buffer. Pero los claims (exp, iat, etc.) solo se agregan si el payload es un objeto. expiresIn es justamente eso: un pedido de agregar el claim exp al toke
 */
