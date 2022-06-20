import Multer from '../middleware/multer';
import Controller, { APIRoute , Methods} from './../app/controller';

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "",
            method: Methods.GET,
            handler: controller.getUserHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "",
            method: Methods.PUT,
            handler: controller.updateUserHandler,
            localMiddleware:[Multer.singleUpload("profile_picture" , "users")],
            auth:true
        }
    ]
    return r;
}


export default routes