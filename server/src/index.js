import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import path from "path";
const __dirname = path.resolve();

import postRoutes from "./routes/posts.js";
import imageRoutes from "./routes/image.js";

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
app.use("/image", imageRoutes);
app.use("/api/posts", postRoutes);

const CONNECTION_URL = "mongodb://localhost/memories";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} and connected to db`)
    )
  )
  .catch((error) => console.log(`Cannot connect db: ${error.message}`));

mongoose.set("useFindAndModify", false);
