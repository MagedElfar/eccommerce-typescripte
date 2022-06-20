import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface IImage extends Model {
    image: string;
    product: number
}

export default class Contact {
    image:string;
    product:number

    constructor(image:string , product:number){
        this.image = image;
        this.product = product
    }
}

export class ProductImageRepository extends BaseRepository<IImage> {
    constructor(){
        super('product_images')
    }
};
