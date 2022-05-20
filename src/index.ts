import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { connectDatabase } from "./services/database.service";
import { countrieRouter } from "./Routes/countries.routes";
import { decodeToken } from "./Firebase/AdminToken";

import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Reto Final Etapa 1',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080/',
            }
        ]
    },
    apis: [`${path.join(__dirname, './Routes/*.js')}`]
}

const app = express();
dotenv.config();

app.set("port", process.env.PORT || 3000);

connectDatabase()
    .then(() => {
        app.use(morgan("dev"));
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)))
        app.use("/countries", countrieRouter)
        app.listen(app.get("port"), () => {
            console.log(`Server running on port ${app.get("port")}`);
        })
    }).catch((error: Error) => {
        console.log(error);
        process.exit();
    })


