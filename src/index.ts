import express , {Application , urlencoded , json} from "express";
import Server from "./app/server";
import cors from "cors";
import morgan from "morgan";
import {config} from "dotenv";
import routes from "./route"

config()

const app:Application = express();
const port:string = process.env.PORT || "5000";

const server:Server = new Server(app , +port);

server.loadMiddleware([
    cors(),
    morgan("short"),
    urlencoded({extended: true}),
    json(),

])

server.setRoutes(routes);

server.errorHandler()

server.run()