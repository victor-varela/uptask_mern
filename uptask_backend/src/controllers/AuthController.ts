import type {Request, Response} from "express"

export class AuthController {
    static CreateAccount = (req:Request, res:Response)=>{
        res.send('desde auth')
    }
}