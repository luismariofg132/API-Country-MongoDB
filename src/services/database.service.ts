import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { InterfaceCountrie } from "../Models/countries";

export const collection: { countries?: mongoDB.Collection<InterfaceCountrie> } = {}

export const connectDatabase = async () => {
    dotenv.config()

    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING)

    await client.connect()

    const db = client.db(process.env.DB_NAME)

    await applySchemaValidation(db);

    const countriesCollection = db.collection<InterfaceCountrie>(process.env.COLLECTION_NAME)

    collection.countries = countriesCollection

    console.log("Database connected")
}

const applySchemaValidation = async (db: mongoDB.Db) => {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["country_name", "country_short_name", "country_phone_code"],
            additionalProperties: false,
            properties: {
                _id: {},
                country_name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                country_short_name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                country_phone_code: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                }
            }
        }
    }

    await db.command({
        collMod: process.env.DB_COLLECTION_NAME,
        validator: jsonSchema
    }).catch(async (error: mongoDB.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection(process.env.COLLECTION_NAME, { validator: jsonSchema });
        }
    })
}