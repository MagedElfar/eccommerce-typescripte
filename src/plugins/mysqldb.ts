import knex from "knex";
import db from "../database";
import DBRepository, { Options } from "../utils/database";

export default abstract class BaseRepository<T> extends DBRepository<T> {
    private table:string;
    protected db;

    constructor(table:string) {
        super()
        this.table = table;
        this.db = db;
    }

    async findMany(query: Partial<T> = {} , option:Options = {limit:10 , offset:0} ):Promise<T[]>{
        try {
            const data = await this.db(this.table).where(query).limit(option.limit!).offset(option.offset!)

            return data;
        } catch (error) {
            throw error
        }
    }

    async findOne(query:object):Promise<T>{
        try {
            const data = await this.db(this.table)
            
            .where(query).first()
            return data;
        } catch (error) {
            throw error
        }
    }

    async create(item:T | Partial<T>):Promise<T>{
        try {
            const [id] = await this.db(this.table).insert(item);
            const data = await this.findOne({id});
            return data;
        } catch (error) {
            throw error
        }
    }

    async createMany(items:T[] | string []):Promise<void>{
        try {
            await this.db(this.table).insert(items);
            return;
        } catch (error) {
            throw error
        }
    }

    async update(id:number , item:T | Partial<T>):Promise<T>{
        try {
            await this.db(this.table).where({id}).update(item);
            return  await this.findOne({id});
        } catch (error) {
            throw error
        }
    }

    async deleteOne(id:number):Promise<void> | never{
        try {
            await this.db(this.table).where({id}).delete();
            return;
        } catch (error) {
            throw error
        }
    }
}