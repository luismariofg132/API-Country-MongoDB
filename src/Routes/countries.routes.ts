import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collection } from "../services/database.service";

// Validate Joi
import validator from "../Utilities/validator";
import countrySchema from "../Schemas-Joi/country.schemajoi";

export const countrieRouter = express.Router();

countrieRouter.use(express.json());

countrieRouter.get("/", async (req: Request, res: Response) => {
    try {
        const countries = await collection.countries.find({}).toArray();
        res.json(countries).status(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

countrieRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const country = await collection.countries.findOne({ _id: new ObjectId(id) });
        if (country) {
            res.json(country).status(200);
        } else {
            res.status(404).json({ message: "Country not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

countrieRouter.post("/", validator.body(countrySchema), async (req: Request, res: Response) => {
    try {
        const newCountrie = req.body;
        const result = await collection.countries.insertOne(newCountrie);

        result
            ? res.json({ "_id": result.insertedId }).status(201)
            : res.status(500).json({ message: "Error while inserting country" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

countrieRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const countrie = req.body;

        const query = { _id: new ObjectId(id) };
        const result = await collection.countries.updateOne(query, { $set: countrie });

        result
            ? res.json(countrie).status(200)
            : res.status(500).json({ message: "Error while updating country" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

countrieRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await collection.countries.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send({ message: "Country deleted" });
        } else if (!result) {
            res.json({ message: `Failed to delete country with id ${id}` }).status(400);
        } else if (!result.deletedCount) {
            res.json({ message: `country with id ${id} not found` }).status(404);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

