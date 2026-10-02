import mongoose, { Schema, Document, Types, Date } from "mongoose";

//1
export interface IToken extends Document {
  token: string;
  user: Types.ObjectId;
  createdAt: Date;
}

//2
const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);
export default Token;

/**
 * 1- crear type con interface - usamos Document de mongoose| esto es para Ts
 * 2- definir el schema
 * 3- crear el modelo a partir del schema
 *
 *
 *
 * Anteriormente usamos PopulatedDoc<ITask & Document>[] en el modelo de Project
 * porque el campo tasks (en plural, un array) necesita que le digamos a Ts que
 * ADEMÁS de ObjectIds, puede contener los documentos completos de Task una vez
 * que se hace populate() -- por eso ese type especial.
 *
 * En el schema, ref:"Task" (o ref:"User" acá) hace lo mismo en los dos casos:
 * le dice a Mongoose a qué modelo apunta el ObjectId guardado, sea un solo id
 * (como user acá) o un array de ids (como tasks en Project).
 *
 * populate() NO depende de si la relación es 1-a-1 o 1-a-muchos -- depende
 * de si necesito LEER datos de adentro del documento referenciado (nombre,
 * email, etc.) o si me alcanza con el id pelado. Acá, en Token, con el id
 * de user alcanza para identificar a quién pertenece el token (ej. comparar
 * ids), así que no hace falta populate. Si en algún momento necesitara, por
 * ejemplo, el email del user para reenviar un mail, ahí sí haría falta
 * populate("user"), aunque siga siendo una relación 1-a-1.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
