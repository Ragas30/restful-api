import express from "express";
import { registerUser } from "../controller/userController.js";

export const publicRoute = express.Router();

publicRoute.post("/users/register", registerUser);
