import connectDB from "./db/connect";
import config from "./config/default";
import app from "./utils/app";

const host: string = config.host;
const port: number = config.port;

app.listen(port, async () => {
  console.log(`server running on ${host}:${port}`);

  await connectDB();
});
