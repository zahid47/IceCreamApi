import connectDB from "./db/connect";
import app from "./utils/app";
import log from "./utils/logger";
import swaggerDocs from "./utils/swagger";

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, async () => {
  log.info(`server running on ${host}:${port}`);

  await connectDB();
  swaggerDocs(app, port);
});
