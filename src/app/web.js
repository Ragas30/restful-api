import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";
import { publicRoute } from "../routes/publicRoute.js";

export const web = express();
web.use(cors());
web.use(express.json());

web.use("/api", publicRoute);

web.use(errorMiddleware);
