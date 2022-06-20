import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express";
import routes from "../route/category";
import CategoryServices from "../services/category";



export default class CategoryController extends Controller{
    path: string;
    protected routes: APIRoute[];
    private categoryServices: CategoryServices;
    constructor(){
        super();
        this.path = "/categories";
        this.routes = routes(this);
        this.categoryServices = new CategoryServices()
    }

    async addCategoryHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {

            await this.categoryServices.create(req.body.name) 

            super.setResponseSuccess({
                res , status:201 , message:"category is add successfully"
            })
            

        } catch (error) {
            next(error)
        }
    }

    async getCategoryHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {

            const categories =  await this.categoryServices.findMany()

            super.setResponseSuccess({
                res , status:201 , data:{categories}
            })
            

        } catch (error) {
            next(error)
        }
    }
}