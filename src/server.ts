import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from "./db/connect";
import config from "./config/default";
import icecreams from "./routes/api/v1/icecream";

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    name: "Ice Cream API",
    version: config.version,
    date: new Date().toDateString(),
  });
});

app.use("/api/v1/icecreams", icecreams);

const host: string = config.host;
const port: number = config.port;

app.listen(port, async () => {
  console.log(`server running on ${host}:${port}`);
  await connectDB();
});
