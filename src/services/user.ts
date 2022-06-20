import { AddressRepository } from './../model/address';
import { ContactRepository, IContact } from './../model/contact';
import Service from "../app/service";
import UserFactor, {User , IUser, UserRepository } from "../model/user";

export default class UserServices extends Service{
    _userRepository:UserRepository;
    constructor() {
        super()
        this._userRepository = new UserRepository();
    }

    async findOne(item:Partial<IUser>):Promise<IUser>{
        try {
            const user = await this._userRepository.findOne(item);
            return user;
        } catch (error) {
            throw error
        }
    }
    

    async create(data:any):Promise<IUser> | never {
        try {
            const factory = new UserFactor("customer" , data)

            const user:User = factory.createUser()

            await user.setPassword()
            delete user['descount']

            return await this._userRepository.create(user)
        } catch (error) {
            throw error;
        }
    }

    async update(id:number , data:Partial<IUser>): Promise<IUser> {
        try {
            return await this._userRepository.update(id , data)
        } catch (error) {
            throw error
        }
    }

}
