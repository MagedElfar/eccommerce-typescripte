import Controller, { APIRoute , Methods} from '../app/controller'
import { contactValidation, isValidate } from '../middleware/validators';

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "",
            method: Methods.POST,
            handler: controller.addContactHandler,
            localMiddleware:[contactValidation , isValidate],
            auth:true
        },
        {
            path: "",
            method: Methods.GET,
            handler: controller.getContactsHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deleteContactHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.PUT,
            handler: controller.updateContactHandler,
            localMiddleware:[contactValidation , isValidate],
            auth:true
        }
    ]
    return r;
}


export default routes