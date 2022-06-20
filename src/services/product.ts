import Product, { ProductRepository, IProduct } from './../model/product';
import Service from "../app/service";
import { setError } from '../utils/error-format';
import ProductProcess from '../utils/product';

export default class ContactServices extends Service{
    _productRepository: ProductRepository;

    constructor() {
        super();
        this._productRepository = new ProductRepository()
    }

    async findMany ():Promise<IProduct[]>{
        try {
            let contacts = await this._productRepository.findMany( )

            return contacts
        } catch (error) {
            throw error
        }
    } 

    async create(data:Partial<IProduct> , files: any): Promise<IProduct | void> {
        try {

            const {title , ...obj} = data

            const product = new Product(title! , obj)

            const productProcess = new ProductProcess(product , files)

            await productProcess.createProduct();

            return;
        } catch (error) {
            throw error;
        }
    }

    async deleteOne({user , id}: {user:number , id:number}): Promise<void> {
        try {
            const product:Product = await this._productRepository.findOne({id});
            super.checkIfDataExists(product);
            await this._productRepository.deleteOne(id)
            return; 
        } catch (error) {
            throw error
        }
    }

    async update({id, data , user} :{id: any, data: Partial<IProduct> , user:number}): Promise<IProduct> {
        try {
            const product:Product = await this._productRepository.findOne({id});
            super.checkIfDataExists(product);

            return await this._productRepository.update(id , {phone: data.phone})
        } catch (error) {
            throw error
        }
    }
}