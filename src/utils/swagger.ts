import { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { version } from "../../package.json";
import logger from "./logger";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IcecreamAPI docs",
      version,
    },
  },
  apis: [
    "./src/utils/app.ts",
    "./src/routes/api/v1/*.ts",
    "./src/schema/*.ts",
  ],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app: Express, port: number) => {
  //swagger ui page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  //swagger json page
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  const host = process.env.HOST;
  logger.info(`Docs available at ${host}:${port}/docs`);
};

export default swaggerDocs;
