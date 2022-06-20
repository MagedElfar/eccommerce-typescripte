import MySqlDB from "../plugins/mysqldb";
import DBService from "../utils/database"
import { setError } from "../utils/error-format";

export default abstract class Service{

    checkIfDataExists(data:object) {
        try {
            if(!data) throw setError(404 , "item not found");
        } catch (error) {
            throw error
        }
    }

    belongToUser(user:number , currentUser:number) {
        try{
            if(user !== currentUser) throw setError (403 , "Forbidden")
        } catch(error){
            throw error
        }
    }

}