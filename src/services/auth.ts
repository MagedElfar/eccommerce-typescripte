import UserServices from "./user";
import {setError} from "./../utils/error-format";
import Token from "../middleware/token";
import Password from "../utils/password";
import EmailServices from "../utils/email";
import MailGun from "../plugins/mailgun";

interface ILogin{
    password:string,
    email:string
}

interface ISignup{
    username:string,
    password:string,
    email:string
}

export default class AuthServices{
    userService:UserServices;
    token:Token;
    emailService:EmailServices;

    constructor() {
        this.userService = new UserServices();
        this.token = new Token("5h");
        this.emailService = new EmailServices(new MailGun())
    }
    
    async login({email , password}:ILogin):Promise<object> | never {
        try {
            const user = await this.userService.findOne({email});

            const pass = Password.getInstance();

            if(!user) throw setError(400 , "Invalid Email or Password");

            const isMatched = await pass?.checkPassword(password , user.password);

            if(!isMatched) throw setError(400 , "Invalid Email or Password")

            const {password:p , ...others} = user
            

            const token = this.token.generateToken({id:user.id})
            
            return {
                user:others,
                token
            }
        } catch (error) {
            throw error
        } 
    }

    async signup({email , password , username}:ISignup):Promise<object> | never {
        try {
            let user = await this.userService.findOne({email})
            
            if(user) throw setError(400 , "email is already exist");

            user = await this.userService.create({email , password , username})


            const token = this.token.generateToken({id:user.id})

            const {password:pass , ...others} = user;

            this.emailService.sendMail({to:email , subject:"Susses Restoration" , text: `thank you ${username} for your restoration`})

            return {
                user:others,
                token
            }
        } catch (error) {
            throw error
        }
    }
}