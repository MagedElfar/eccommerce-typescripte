import Controller from "../app/controller";
import AuthController from "../controllers/auth";
import ContactController from "../controllers/contact";
import UserController from "../controllers/user";
import AddressController from "../controllers/address";
import CategoryController from "../controllers/category";
import ProductController from "../controllers/product";


const routes:Controller [] = [
    new AuthController(),
    new UserController(),
    new ContactController(),
    new AddressController(),
    new CategoryController(),
    new ProductController()
]

export default routes