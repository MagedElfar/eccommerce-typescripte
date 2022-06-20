import Category, { CategoryRepository , ICategory } from './../model/category';
import Service from "../app/service";
import { setError } from '../utils/error-format';

export default class CategoryServices extends Service{
    _categoryRepository: CategoryRepository;

    constructor() {
        super();
        this._categoryRepository = new CategoryRepository()
    }

    async findMany ():Promise<ICategory[]>{
        try {
            const categories = await this._categoryRepository.findMany()

            return categories
        } catch (error) {
            throw error
        }
    } 

    async create(name:string): Promise<ICategory> {
        try {
            let contact = await this._categoryRepository.findOne({name});

            if (contact) throw setError(400 , "category already exists")

            contact = new Category(name)

            return await this._categoryRepository.create({name});

        } catch (error) {
            throw error;
        }
    }
}