import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express";
import routes from "../route/contact";
import ContactServices from "../services/contact";



export default class ContactController extends Controller{
    path: string;
    protected routes: APIRoute[];
    private contactServices: ContactServices;
    constructor(){
        super();
        this.path = "/contacts";
        this.routes = routes(this);
        this.contactServices = new ContactServices()
    }

    async addContactHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const id = req.user?.id!;

            await this.contactServices.create({
                phone:req.body.phone,
                user: +id
            }) 

            super.setResponseSuccess({
                res , status:201 , message:"contact number is add successfully"
            })
            

        } catch (error) {
            next(error)
        }
    }

    async getContactsHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const id = req.user?.id;

            const contacts =  await this.contactServices.findMany({user: id})

            super.setResponseSuccess({
                res , status:201 , data:{contacts}
            })
            

        } catch (error) {
            next(error)
        }
    }

    async deleteContactHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const userId = req.user?.id!;
            const {id} = req.params

            await this.contactServices.deleteOne({id: +id , user: +userId})

            super.setResponseSuccess({
                res , status:201 , message: 'phone is deleted'
            })
            

        } catch (error) {
            next(error)
        }
    }

    async updateContactHandler(req:Request , res:Response , next:NextFunction) :  Promise<void>{
        try {
            const userId = req.user?.id!;
            const {id} = req.params

            await this.contactServices.update({id: +id , user: +userId , data:req.body})

            super.setResponseSuccess({
                res , status:201 , message: 'phone is updated'
            })
            

        } catch (error) {
            next(error)
        }
    }
}