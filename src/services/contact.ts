import Contact, { ContactRepository, IContact } from './../model/contact';
import Service from "../app/service";
import { setError } from '../utils/error-format';

export default class ContactServices extends Service{
    _contactRepository: ContactRepository;

    constructor() {
        super();
        this._contactRepository = new ContactRepository()
    }

    async findMany (query:Partial<IContact>):Promise<IContact[]>{
        try {
            let contacts = await this._contactRepository.findMany(query )

            return contacts
        } catch (error) {
            throw error
        }
    } 

    async create({user , phone}:{user:number , phone:string}): Promise<IContact> {
        try {
            let contact = await this._contactRepository.findOne({user , phone});

            if (contact) throw setError(400 , "this pone already exists")

            contact = new Contact({phone , user})

            return await this._contactRepository.create({user , phone});

        } catch (error) {
            throw error;
        }
    }

    async deleteOne({user , id}: {user:number , id:number}): Promise<void> {
        try {
            const contact:Contact = await this._contactRepository.findOne({id});
            super.checkIfDataExists(contact);
            super.belongToUser(contact.user , user)
            await this._contactRepository.deleteOne(id)
            return; 
        } catch (error) {
            throw error
        }
    }

    async update({id, data , user} :{id: any, data: Partial<IContact> , user:number}): Promise<IContact> {
        try {
            const contact:Contact = await this._contactRepository.findOne({id});
            super.checkIfDataExists(contact);
            super.belongToUser(contact.user , user)
            return await this._contactRepository.update(id , {phone: data.phone})
        } catch (error) {
            throw error
        }
    }
}