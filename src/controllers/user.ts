import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express";
import routes from "../route/user";
import Service from "../app/service";
import UserServices from "../services/user";



export default class UserController extends Controller{
    path: string;
    protected routes: APIRoute[];
    userServices: UserServices;
    constructor(){
        super();
        this.path = "/users";
        this.routes = routes(this);
        this.userServices = new UserServices();
    }

    async getUserHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {
            
            const id = req.user?.id

            const user = await this.userServices.findOne({id});

            const {password:pass , ...others} = user

            super.setResponseSuccess({res , status:200 , data:{
                user:others
            } })

        } catch (error) {
            next(error)
        }
    };

    async updateUserHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {
            
            const id = req.user?.id;

            const data = req.body;

            if(req.file?.filename) data.profile_picture = req.file?.filename

            await this.userServices.update(id! , data)

            super.setResponseSuccess({res , status:200 , message:"user updated successfully"})

        } catch (error) {
            next(error)
        }
    };
}