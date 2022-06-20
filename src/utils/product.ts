import { ProductImageRepository } from './../model/product-images';
import { ProductRepository, IProduct } from './../model/product';
import { any } from 'underscore';

export default class ProductProcess {
    private _productRepository:ProductRepository;
    private _imageRepository:ProductImageRepository;
    private product:IProduct;
    private files: any;

    constructor(product:IProduct , files:any = null) {
        this.product = product;
        this.files = files
        this._imageRepository = new ProductImageRepository();
        this._productRepository = new ProductRepository();
    }

    async createProduct(): Promise<boolean> {
        try {
            const {images , ...obj } = this.product;

            console.log(images)

            const product = await this._productRepository.create(obj);
            if(this.files){

                const images = this.files.map((item:any) => {
                    return {product: product.id , image: item.filename}
                })

                await this._imageRepository.createMany(images)

            } 
            return true
        } catch (error) {
            throw error;
        }
    }
}