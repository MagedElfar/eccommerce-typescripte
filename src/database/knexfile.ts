import {config} from "dotenv";
import path from "path"
config({path:path.join(__dirname,'../../.env')})

//require("ts-node/register")

const dbConfiguration = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    user: process.env.DB_USERNAME!, 
    password: process.env.DB_PASSWORD || "", 
    database: process.env.DB_NAME!
  },
  migrations: {
    directory: path.join(__dirname, "migrations"),
  },
  // seeds: {
  //   directory: path.join(__dirname ,  'seed')
  // }
}; 

Object.freeze(dbConfiguration)

export default dbConfiguration;