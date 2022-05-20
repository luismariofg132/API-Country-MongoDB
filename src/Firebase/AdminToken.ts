import { Request, Response, NextFunction } from "express";
import admin from "./firebase";

export const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        if (token === undefined) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const decodeValue = await admin.auth().verifyIdToken(token!);
            if (decodeValue != null || decodeValue != undefined) {
                return next();
            }
            return res.json({ message: "Unauthorized" });
        }
    } catch (error) {
        if (error.code === "auth/id-token-expired") {
            return res.json({ message: "Token expired" }).status(401);
        } else if (error.code === "auth/argument-error") {
            return res.json({ message: "Invalid token" }).status(401);
        } else {
            return res.json({ message: "Internal Server Error" }).status(500);
        }
    }
}