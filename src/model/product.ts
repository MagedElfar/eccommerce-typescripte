import { IImage } from './product-images';
import { ICategory } from './category';
import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import shortid from "shortid";

export interface IProduct extends Model {
    title: string;
    sku: string;
    description?: string;
    category: ICategory | number;
    quantity: number;
    price: number
    images?: IImage [] | string []
}

export default class Product implements IProduct {
    title: string;
    sku: string;
    description?: string | undefined;
    category: number | ICategory;
    quantity: number;
    price: number;
    images?: IImage [] | string []

    constructor(title:string , {description , category = 1 , quantity = 0 , price = 0 , images }:Partial<IProduct>){
        this.title = title;
        this.category = category;
        this.sku = shortid.generate();
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.images = images
    }
}

export class ProductRepository extends BaseRepository<IProduct> {
    constructor(){
        super('products')
    }
};
