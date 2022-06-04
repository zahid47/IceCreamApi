import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import icecreams from "../routes/api/v1/icecream";
import dotenv from "dotenv";
import path from "path";
import { version } from "../../package.json";

const app: Express = express();
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    name: "Ice Cream API",
    version,
    date: new Date().toDateString(),
  });
});

app.use("/api/v1/icecreams", icecreams);

export default app;
