import { UserRepository } from './../model/user';
import {Request , Response , NextFunction} from "express";
import { setError } from '../utils/error-format';

export default class AdminMW {
    private static _userRepository = new UserRepository()

    static async checkRole(req:Request , res:Response , next:NextFunction) {
        try{
            const id = req.user?.id;

            const user = await AdminMW._userRepository.findOne({id});

            if(user.role !== "admin") throw setError (403 , "Forbidden");

            next();

        } catch(error){
            next(error)
        }
    }
}