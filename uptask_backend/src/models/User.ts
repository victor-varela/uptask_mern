import mongoose, { Schema, Document } from "mongoose";

//1
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  confirmed: boolean;
}

//2
const UserSchema:Schema = new Schema({
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

//3
const User = mongoose.model<IUser>("User", UserSchema); 
export default User;

/**
 * Un user se va a autenticar por email y password, y tiene ademas un name y confirmed (para registrar si confirmo la cuenta o no)
 * 1- crear type con interface - usamos Document de mongoose
 * 2- definir el schema
 * 3- crear el modelo a partir del schema
 *
 *
 *
 *
 *
 */
