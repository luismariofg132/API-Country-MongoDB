"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.collection = void 0;
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
exports.collection = {};
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    yield client.connect();
    const db = client.db(process.env.DB_NAME);
    yield applySchemaValidation(db);
    const countriesCollection = db.collection(process.env.COLLECTION_NAME);
    exports.collection.countries = countriesCollection;
    console.log("Database connected");
});
exports.connectDatabase = connectDatabase;
const applySchemaValidation = (db) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    yield db.command({
        collMod: process.env.DB_COLLECTION_NAME,
        validator: jsonSchema
    }).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.codeName === 'NamespaceNotFound') {
            yield db.createCollection(process.env.COLLECTION_NAME, { validator: jsonSchema });
        }
    }));
});
//# sourceMappingURL=database.service.js.map