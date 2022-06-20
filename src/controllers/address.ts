import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express";
import routes from "../route/address";
import AddressServices from "../services/address";



export default class addressController extends Controller{
    path: string;
    protected routes: APIRoute[];
    private addressServices: AddressServices;
    constructor(){
        super();
        this.path = "/addresses";
        this.routes = routes(this);
        this.addressServices = new AddressServices()
    }

    async addAddressHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const id = req.user?.id!;
            const data = req.body

            await this.addressServices.create({
                ...data,
                user: +id
            }) 

            super.setResponseSuccess({
                res , status:201 , message:"address is add successfully"
            })
            

        } catch (error) {
            next(error)
        }
    }

    async getAddressesHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const id = req.user?.id;

            const addresses =  await this.addressServices.findMany({user: id})

            super.setResponseSuccess({
                res , status:201 , data:{addresses}
            })
            

        } catch (error) {
            next(error)
        }
    }

    async deleteAddressHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const userId = req.user?.id!;
            const {id} = req.params

            await this.addressServices.deleteOne({id: +id , user: +userId})

            super.setResponseSuccess({
                res , status:200 , message: 'phone is deleted'
            })
            

        } catch (error) {
            next(error)
        }
    }

    async updateAddressHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const userId = req.user?.id!;
            const {id} = req.params

            await this.addressServices.update({id: +id , user: +userId , data:req.body})

            super.setResponseSuccess({
                res , status:200 , message: 'address is updated'
            })
            

        } catch (error) {
            next(error)
        }
    }
}