import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface IAddress extends Model{
    address_1:string;
    address_2?:string;
    type?:string;
    user:number;
    country:string;
    city:string;
    state?:string;
    zip_postal_code:string;
}

abstract class Address implements IAddress {
    address_1: string;
    address_2?: string | undefined;
    abstract type: string;
    user: number;
    country: string;
    city: string;
    state?: string | undefined;
    zip_postal_code: string;
    
    constructor({address_1 , address_2 , user , country , city , state , zip_postal_code}:IAddress){
        this.address_1 = address_1;
        this.address_2 = address_2;
        this.user = user;
        this.country = country;
        this.city = city;
        this.state = state;
        this.zip_postal_code = zip_postal_code
    }
}

class BillingAddress extends Address {
    type: string;
    constructor(address:IAddress){
        super(address);
        this.type = "billing"
    }
}

class ShippingAddress extends Address {
    type: string;
    constructor(address:IAddress){
        super(address);
        this.type = "shipping";
    }
}

export default class AddressFactory {
    type:string;
    constructor(type:string) {
        this.type = type;
    }

    addressFactory(address:IAddress):IAddress{
        switch(this.type){
            case "billing":
                return new BillingAddress(address);
            default:
                return new ShippingAddress(address)
        }
    }
}

export class AddressRepository extends BaseRepository<IAddress> {
    constructor() {
        super("addresses")
    }
}