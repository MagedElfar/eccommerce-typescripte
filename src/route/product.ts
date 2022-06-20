import Controller, { APIRoute , Methods} from '../app/controller'
import AdminMW from '../middleware/admin';
import { productValidation, isValidate } from '../middleware/validators';
import Multer from '../middleware/multer';

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "",
            method: Methods.POST,
            handler: controller.addProductHandler,
            localMiddleware:[
                AdminMW.checkRole ,
                Multer.multipleUpload('image' , "products"),
                productValidation , 
                isValidate ,
            ],
            auth:true
        },
        {
            path: "",
            method: Methods.GET,
            handler: controller.getProductsHandler,
            localMiddleware:[],
            auth:true
        },
        // {
        //     path: "/:id",
        //     method: Methods.DELETE,
        //     handler: controller.deleteProductHandler,
        //     localMiddleware:[AdminMW.checkRole],
        //     auth:true
        // },
        // {
        //     path: "/:id",
        //     method: Methods.PUT,
        //     handler: controller.updateProductHandler,
        //     localMiddleware:[AdminMW.checkRole , productValidation , isValidate],
        //     auth:true
        // }
    ]
    return r;
}


export default routes