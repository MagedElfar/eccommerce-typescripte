export interface Options{
    limit?: number,
    offset?: number
}

interface IWrite<T>{
    create:  (item:T) => Promise<T>;
    createMany: (items: T[] | any []) => Promise<void> ;
    update:  (id:number | string , item:T | Partial<T> ) => Promise<T>;
    deleteOne:  (id:number | string) => Promise<void>;
}

interface IRead<T>{
    findMany:  (query: Partial<T> , option:Options) => Promise<T[]>;
    findOne: (query: Partial<T>) => Promise<T>;
}


export default abstract class DBRepository <T> implements IRead<T> , IWrite<T>  {

    protected abstract db:any;

    abstract findMany(query: Partial<T> , option:Options):Promise<T[]>;

    abstract findOne(query: Partial<T>):Promise<T>;

    abstract create(item:T):Promise<T>;

    abstract createMany(items: T[] | any []): Promise<void>;

    abstract update(id:number | string , item:T | Partial<T>):Promise<T>;

    abstract deleteOne(id:number | string):Promise<void>
}

