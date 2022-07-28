const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const logger = require("./config/logger");

// Load environment variables from .env file
dotenv.config({ path: "./config/config.env" });
const db = process.env.DATABASE

let server;
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
  logger.info("Connected to database");
  server = app.listen(process.env.PORT, () => {
    logger.info(`Server running on port ${process.env.PORT}`);
  });
});

const exitHandler = (options, err) => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
