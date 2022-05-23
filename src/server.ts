import connectDB from "./db/connect";
import app from "./utils/app";

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`server running on ${host}:${port}`);

  await connectDB();
});
