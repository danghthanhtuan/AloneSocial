
import { Route } from "@core/interfaces";
import validationMiddleware from "@core/middleware/validation.middleware";
import { Router } from "express";
import RegisterDto from "./Dto/register.dto";
import UserController from "./users.controller";

export default class UserRoute implements Route{
    public path = '/api/users';
    public router = Router();

    public userController = new UserController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(this.path, validationMiddleware(RegisterDto, true), this.userController.register); // post: http://localhost:5000/api/users
    }
}