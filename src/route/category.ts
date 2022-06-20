import Controller, { APIRoute , Methods} from '../app/controller'
import AdminMW from '../middleware/admin';
import { categoryValidation, isValidate } from '../middleware/validators';

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "",
            method: Methods.POST,
            handler: controller.addCategoryHandler,
            localMiddleware:[AdminMW.checkRole , categoryValidation , isValidate],
            auth:true
        },
        {
            path: "",
            method: Methods.GET,
            handler: controller.getCategoryHandler,
            localMiddleware:[],
            auth:true
        }
    ]
    return r;
}


export default routes