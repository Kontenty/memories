import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import errorMiddleware from "./middleware/error.js";
import routes from "./routes/index.js";

const __dirname = path.resolve();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
app.use("/", routes);

// not found handler
app.use((req, res) => {
  res.status(404);

  res.format({
    html() {
      res.render("404", { url: req.url });
    },
    json() {
      res.json({ error: "Not found" });
    },
    default() {
      res.type("txt").send("Not found");
    },
  });
});

// general error handler
app.use(errorMiddleware);

export default app;
