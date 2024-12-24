import express from "express";
import { registerUser } from "../controller/userController.js";
import { initController } from "../controller/initController.js";
import { getPenyakit } from "../controller/penyakitController.js";

export const publicRoute = express.Router();

publicRoute.post("/users/register", registerUser);
publicRoute.get("/init/", initController);
publicRoute.get("/penyakit/", getPenyakit);
