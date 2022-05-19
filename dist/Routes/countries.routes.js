"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countrieRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.countrieRouter = express_1.default.Router();
exports.countrieRouter.use(express_1.default.json());
exports.countrieRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield database_service_1.collection.countries.find({}).toArray();
        res.json(countries).status(200);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.countrieRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const country = yield database_service_1.collection.countries.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (country) {
            res.json(country).status(200);
        }
        else {
            res.status(404).json({ message: "Country not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.countrieRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCountrie = req.body;
        const result = yield database_service_1.collection.countries.insertOne(newCountrie);
        result
            ? res.json({ "_id": result.insertedId }).status(201)
            : res.status(500).json({ message: "Error while inserting country" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.countrieRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const countrie = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collection.countries.updateOne(query, { $set: countrie });
        result
            ? res.json(countrie).status(200)
            : res.status(500).json({ message: "Error while updating country" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.countrieRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collection.countries.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send("Languaje deleted");
        }
        else if (!result) {
            res.json({ message: `Failed to delete languaje with id ${id}` }).status(400);
        }
        else if (!result.deletedCount) {
            res.json({ message: `Languaje with id ${id} not found` }).status(404);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
//# sourceMappingURL=countries.routes.js.map