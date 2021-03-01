
import { Route } from "@core/interfaces";
import authMiddleware from "@core/middleware/auth.middleware";
import { Router } from "express";
import AuthController from "./auth.controller";

export default class AuthRoute implements Route {
    public path = '/api/auth';
    public router = Router();

    public userController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path,
            this.userController.login); // post: http://localhost:5000/api/auth

        this.router.get(this.path,
            authMiddleware,
            this.userController.getCurrentLoginUser); // GET: http://localhost:5000/api/auth -> required login
    }
}