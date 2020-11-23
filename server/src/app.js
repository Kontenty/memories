import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import errorMiddleware from "./middleware/error.js";
import routes from "./routes/index.js";

const __dirname = path.resolve();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "/../client/build")));
app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.use("/api", routes);
// general error handler
app.use(errorMiddleware);

export default app;
