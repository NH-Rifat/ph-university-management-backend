import app from "./app";
import config from "./app/config";
import { Server } from "http";
import mongoose from "mongoose";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown", error);
  process.exit(1);
});
