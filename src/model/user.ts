import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import Password from "../utils/password";
import { IAddress } from "./address";
import { IContact } from "./contact";

export interface IUser extends Model {
    username:string;
    email:string;
    password: string;
    role?:string,
    profile_picture?:string
    descount?: number,
    contacts?: IContact [],
    addresses?: IAddress [],
}

export abstract class User implements IUser {
    username:string;
    email:string;
    password: string; 
    abstract role:string;
    profile_picture:string
    abstract descount?: number;

    constructor({username , email , password , profile_picture = ""}: IUser){
        this.username = username;
        this.email = email;
        this.password = password,
        this.profile_picture = profile_picture
    }

    async setPassword():Promise<void> | never{
        try {
            const password = Password.getInstance()
            if(!password) return;
            
            this.password = await password.setPassword(this.password);
        } catch (error) {
            throw error
        }
    };


    getPassword():string | undefined{
        return this.password;
    }
}

class Customre extends User {
    descount: number;
    role:string;
    constructor(user:IUser) {
        super(user);
        this.role = "customer";
        this.descount = 0
    }
}

class Corporate extends User {
    descount: number;
    role:string;
    constructor(user:IUser) {
        super(user);
        this.role = "corporate";
        this.descount = 50
    }
}

class Admin extends User {
    descount: number;
    role:string;
    constructor(user:IUser) {
        super(user);
        this.role = "admin";
        this.descount = 50
    }
}


export default class UserFactory{
    readonly type:string;
    readonly user:IUser;

    constructor(type:string , user:IUser){
        this.type = type;
        this.user = user
    }

    createUser():User {
        switch(this.type){
            case "admin":
                return new Admin(this.user)
            case "corporate":
                return new Corporate(this.user)
            default:
                return new Customre(this.user)
        }
    }
}

export class UserRepository extends BaseRepository<IUser>{
    constructor() {
        super('users')
    }
    async findOne(query: Partial<IUser>): Promise<IUser> {
        try {
            const key:string = Object.keys(query)[0]!
            query = key === 'id' ? {'u.id' : query[key]} : query

            const user = await this.db("users as u")
            .leftJoin("contacts as c" ,{ "c.user":  "u.id"})
            .leftJoin("addresses as a" , {"a.user": "u.id"})
            .where(query).options({nestTables: true }).then(r => {

                if(r.length <= 0) return null;

                const user = r.reduce((obj:IUser , item:any) => {
                    if(Object.keys(obj).length <= 0){
                        obj = {
                            ...item['u'],
                        }
                    }
                    if(item['c'] && item['c'].id) {
                        obj['contacts'] = obj.contacts  ? [...obj['contacts'] , item['c']] : [item['c']]
                    }
                    if(item['a'] && item['a'].id) {
                        obj['addresses'] = obj.addresses  ? [...obj['addresses'] , item['a']] : [item['a']]
                    }
                    return obj
                } , {})

                return user
            })

            return user
        } catch (error) {
            throw error
        }
    }
}
    