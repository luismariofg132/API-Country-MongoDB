import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collection } from "../services/database.service";

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

countrieRouter.post("/", async (req: Request, res: Response) => {
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
            res.status(202).send("Languaje deleted");
        } else if (!result) {
            res.json({ message: `Failed to delete languaje with id ${id}` }).status(400);
        } else if (!result.deletedCount) {
            res.json({ message: `Languaje with id ${id} not found` }).status(404);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

/**
 * @swagger
 * components:
 *  schemas:
 *      country:
 *          type: object
 *          properties:
 *              country_name:
 *                  type: string
 *                  description: name of the country
 *              country_short_name:
 *                  type: string
 *                  description: short name of the country
 *              country_phone_code:
 *                  type: number
 *                  description: phone code of the country
 *          required:
 *              - country_name
 *              - country_short_name
 *              - country_phone_code
 *          example:
 *              country_name: "Argentina"
 *              country_short_name: "AR"
 *              country_phone_code: 54
 * 
 * @swagger
 * /countries:
 *  get:
 *    summary: Get all countries
 *    tags: [Countries]
 *    responses:
 *      200:
 *          description: A list of countries
 * 
 *    
 */