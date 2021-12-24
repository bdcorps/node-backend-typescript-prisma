import * as dotenv from "dotenv";
import app from "./app";
dotenv.config();


if (!process.env.PORT) {
  process.exit(1);
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
