import Address, { AddressRepository, IAddress } from './../model/address';
import Service from "../app/service";
import { setError } from '../utils/error-format';

export default class ContactServices extends Service{
    _repository: AddressRepository;

    constructor() {
        super();
        this._repository = new AddressRepository()
    }

    async findMany (query:Partial<IAddress>):Promise<IAddress[]>{
        try {
            const Addresses = await this._repository.findMany(query)

            return Addresses
        } catch (error) {
            throw error
        }
    } 

    async create(data:IAddress): Promise<IAddress> {
        try {

            const address = new Address(data.type!).addressFactory(data)
            return await this._repository.create(address);

        } catch (error) {
            throw error;
        }
    }

    async deleteOne({user , id}: {user:number , id:number}): Promise<void> {
        try {
            const address:IAddress = await this._repository.findOne({id});
            super.checkIfDataExists(address);
            super.belongToUser(address.user , user)
            await this._repository.deleteOne(id)
            return; 
        } catch (error) {
            throw error
        }
    }

    async update({id, data , user} :{id: any, data: Partial<IAddress> , user:number}): Promise<IAddress> {
        try {
            const address:IAddress = await this._repository.findOne({id});
            super.checkIfDataExists(address);
            super.belongToUser(address.user , user)
            return await this._repository.update(id , data)
        } catch (error) {
            throw error
        }
    }
}