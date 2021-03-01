import { TokenData } from "@modules/auth";
import { NextFunction, Request, Response } from "express";
import LoginDto from "./auth.dto";
import AuthService from "./auth.service";

export default class AuthController{

    private userService = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const model: LoginDto = req.body;
            const tokenData: TokenData = await this.userService.login(model);

            res.status(200).json(tokenData);
        }catch(error){
            next(error);
        }
    };
}