import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface IContact extends Model {
    phone: string;
    user: number
}

export default class Contact {
    phone:string;
    user:number

    constructor({phone , user}: IContact){
        this.phone = phone;
        this.user = user
    }
}

export class ContactRepository extends BaseRepository<IContact> {
    constructor(){
        super('contacts')
    }
};
