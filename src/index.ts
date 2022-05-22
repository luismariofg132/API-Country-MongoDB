import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { connectDatabase } from "./services/database.service";
import { countrieRouter } from "./Routes/countries.routes";
import { decodeToken } from "./Firebase/AdminToken";

import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
dotenv.config();

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Countries API',
            version: '1.0.0',
            description: 'Countries API with authentication',
            contact: {
                name: 'Luis Mario Franco',
                email: 'lmfg06@gmail.com'
            }
        },
        servers: [
            {
                url: process.env.SERVER_SWAGGER,
            }
        ]
    },
    apis: [`${path.join(__dirname, './Routes/*.js')}`]
}

app.set("port", process.env.PORT || 3000);

connectDatabase()
    .then(() => {
        app.use(morgan("dev"));
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)))
        app.use("/countries", decodeToken, countrieRouter)
        app.listen(app.get("port"), () => {
            console.log(`Server running on port ${app.get("port")}`);
        })
    }).catch((error: Error) => {
        console.log(error);
        process.exit();
    })


