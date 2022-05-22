import express, { Request, Response } from "express";
import Auth from "../Firebase/Auth";
import validator from "../Utilities/validator";
import authSchema from "../Schemas-Joi/auth.schemaJoi";

export const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/createUser", validator.body(authSchema), async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await Auth.createUser(email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

authRouter.post("/login", validator.body(authSchema), async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await Auth.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
