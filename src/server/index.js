import mongoose from "mongoose";
import log from "loglevel";
import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();
log.setLevel("info");

const { CONNECTION_URL } = process.env;
const PORT = process.env.NODE_PORT || process.env.PORT || 5000;

let server;
mongoose.set("useFindAndModify", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    log.info("Connected to mongoDB");
    server = app.listen(PORT, () => log.info(`Server running on port ${PORT}`));
  })
  .catch((error) => log.error(`Cannot connect db: ${error.message}`));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      log.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  log.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  log.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
