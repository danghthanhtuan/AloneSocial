import { IUser, TokenData } from "@modules/auth";
import { NextFunction, Request, Response } from "express";
import RegisterDto from "./Dto/register.dto";
import UserService from "./users.service";

export default class UserController {

    private userService = new UserService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const tokenData: TokenData = await this.userService.createUser(model);

            res.status(201).json(tokenData);
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const user = await this.userService.updateUser(req.params.id, model);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };
}