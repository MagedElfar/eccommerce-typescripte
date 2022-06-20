import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface ICategory extends Model {
    name: string;
}

export default class Category implements ICategory {
    name: string;

    constructor(name:string){
        this.name = name
    }
}

export class CategoryRepository extends BaseRepository<ICategory> {
    constructor(){
        super('categories')
    }
};
