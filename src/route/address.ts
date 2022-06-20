import Controller, { APIRoute , Methods} from '../app/controller'
import { addressValidation, isValidate } from '../middleware/validators';

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "",
            method: Methods.POST,
            handler: controller.addAddressHandler,
            localMiddleware:[addressValidation , isValidate],
            auth:true
        },
        {
            path: "",
            method: Methods.GET,
            handler: controller.getAddressesHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deleteAddressHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.PUT,
            handler: controller.updateAddressHandler,
            localMiddleware:[addressValidation , isValidate],
            auth:true
        }
    ]
    return r;
}


export default routes