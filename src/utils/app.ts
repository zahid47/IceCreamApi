import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import icecreams from "../routes/api/v1/icecream";
import config from "../config/default";

const app: Express = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) =>
  res.status(200).json({
    name: "Ice Cream API",
    version: config.version,
    date: new Date().toDateString(),
  })
);

app.use("/api/v1/icecreams", icecreams);

export default app;
