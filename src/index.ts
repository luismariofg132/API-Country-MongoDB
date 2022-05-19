import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { connectDatabase } from "./services/database.service";
import { countrieRouter } from "./Routes/countries.routes";
import { decodeToken } from "./Firebase/AdminToken";

const app = express();
dotenv.config();

app.set("port", process.env.PORT || 3000);

connectDatabase()
    .then(() => {
        app.use(morgan("dev"));
        app.use(decodeToken);
        app.use("/countries", countrieRouter)

        app.listen(app.get("port"), () => {
            console.log(`Server running on port ${app.get("port")}`);
        })
    }).catch((error: Error) => {
        console.log(error);
        process.exit();
    })


