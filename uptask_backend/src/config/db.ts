import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";
import dns from "dns";

//Para error de conexion querySrv ECONNREFUSED _mongodb._tcp.uptaskdb.bi6xlv5.mongodb.net-NO FUNCIONO
dns.setDefaultResultOrder("ipv4first");

export const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL no está definida en el .env");
    }
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.magenta.bold(`MongoDB connected at ${url}`));
  } catch (error) {
    console.log(error.message);
    console.log(colors.red("Failed to connect MongoDB"));

    exit(1);
  }
};

/**
 * Aca configuro la conexion pero llamo a esta funcion en server.ts
 * TODA COMUNICACION CON LA DB PASA POR MONGOOSE ---> ODM---> EL TRADUCTOR
 *
 *
 *
 */
