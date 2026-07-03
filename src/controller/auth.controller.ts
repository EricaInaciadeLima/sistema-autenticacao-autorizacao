import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController{
    
     constructor(
        private readonly authService: AuthService
      ) {}
 async login(req: Request, res: Response): Promise<void>{
    const result = await this.authService.login(req.body.email, req.body.senha);

    res.status(200).json(result);
}
}