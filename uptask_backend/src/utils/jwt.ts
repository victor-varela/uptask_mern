import jwt from "jsonwebtoken";

const generateJwt = () => {
  const payload = {
    name: "victor",
    credit_card: "123456464",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "6m",
  });

  console.log(token);
  

  return token;
};

export default generateJwt;

/**
 * .sign toma 3 argumentos payload, secret_key, options
 * ExpiresIn 6m son 6 meses
 * un jwt se ve asi: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmljdG9yIiwiY3JlZGl0X2NhcmQiOiIxMjM0NTY0NjQiLCJpYXQiOjE3OTM0NTgxMDAsImV4cCI6MTc5MzQ1ODQ2MH0.TUaP0A3DxyUU1T23gBhRKTJuz-IaJhm8s3QucS593Bs
 *  Tiene 3 partes HEADER PAYLOAD SIGNATURE | estan separados por . en la cadena
 *
 *
 */
