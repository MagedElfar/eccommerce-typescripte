import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction } from "express";
import routes from "../route/product";
import ProductServices from "../services/product";



export default class ProductController extends Controller{
    path: string;
    protected routes: APIRoute[];
    private productServices: ProductServices;
    constructor(){
        super();
        this.path = "/products";
        this.routes = routes(this);
        this.productServices = new ProductServices()
    }

    async addProductHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {

            await this.productServices.create(req.body , req.files) 

            super.setResponseSuccess({
                res , status:201 , message:"product is add successfully"
            })
            

        } catch (error) {
            next(error)
        }
    }

    async getProductsHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const id = req.user?.id;

            const contacts =  await this.productServices.findMany()

            super.setResponseSuccess({
                res , status:201 , data:{contacts}
            })
            

        } catch (error) {
            next(error)
        }
    }

//     async deleteProductHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
//         try {
//             const userId = req.user?.id!;
//             const {id} = req.params

//             await this.contactServices.deleteOne({id: +id , user: +userId})

//             super.setResponseSuccess({
//                 res , status:201 , message: 'phone is deleted'
//             })
            

//         } catch (error) {
//             next(error)
//         }
//     }

//     async updateProductHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
//         try {
//             const userId = req.user?.id!;
//             const {id} = req.params

//             await this.contactServices.update({id: +id , user: +userId , data:req.body})

//             super.setResponseSuccess({
//                 res , status:201 , message: 'phone is updated'
//             })
            

//         } catch (error) {
//             next(error)
//         }
//     }
}