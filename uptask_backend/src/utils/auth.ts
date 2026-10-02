import bcrypt from "bcrypt";

//Para hashear passwords

export async function passwordHash(password) {
  // Definir salt- salt es como el nivel de encriptamiento. Lo hace cada vez que crea un user y es diferente
  const salt = await bcrypt.genSalt(10);
  //Retornamos el valor del hash
  return bcrypt.hash(password, salt);
}
