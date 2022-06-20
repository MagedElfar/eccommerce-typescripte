import  {check , validationResult} from "express-validator";
import {Request , Response , NextFunction} from "express"

//auth validation
const signupValidation = [
    check("username").toLowerCase().not().isEmpty().withMessage("username is required"),

    check("email").isEmail().withMessage("Invalid Email Provided"),
    
    check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&]{8,}$/).withMessage('Invalid Password Format Provided ( Must be at least 8 characters, 1 number and at least one uppercase character )')
]

const loginValidation = [
    check("email").not().isEmpty().withMessage("Email is required"),
    
    check('password').not().isEmpty().withMessage("password is required"),
]

//contact validation
const contactValidation = [
    check("phone").not().isEmpty().withMessage("phone is required"),
]

//category validation
const categoryValidation = [
    check("name").toLowerCase().not().isEmpty().withMessage("name is required"),
]

const productValidation = [
    check("title").toLowerCase().not().isEmpty().withMessage("title is required"),

    check("price").toFloat().not().isEmpty().withMessage("price is required"),

    check("quantity").isInt().withMessage("quantity should be integer"),
]

//address validation
const addressValidation = [
    check("address_1").toLowerCase().not().isEmpty().withMessage("address_1 is required"),

    check("country").toLowerCase().not().isEmpty().withMessage("country is required"),

    check("city").toLowerCase().not().isEmpty().withMessage("city is required"),

    check("zip_postal_code").not().isEmpty().withMessage("zip_postal_code is required"),
]

//check validation
const isValidate = (req:Request , res:Response , next:NextFunction) => {
    try {
        if(validationResult(req).isEmpty()) {
            next()
        } else {
            const errors = validationResult(req).array().reduce((obj:any , item:any) => {
                if(!obj[item.param]){
                    obj[item.param] = [item.msg]
                    return obj
                }

                obj[item.param].push(item.msg);
                return obj
            } , {});
            throw ({
                status:400,
                message: "Please Correct the following errors before proceeding",
                errors});
        }
    } catch (error) {
        return next(error)
    }
}

export {isValidate , signupValidation , loginValidation , productValidation , contactValidation , addressValidation , categoryValidation} 