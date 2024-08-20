import express from "express";
import { OK_STATUS } from "./Models/Constants.js";
import connectDatabase from "./Context/DbConnect.js";
import routes from "./routes/index.js";

const dbConnect = await connectDatabase();

// DB connection error event method
dbConnect.on("error", (error) => {
  console.error("Database error: ", error);
});

// DB Connection event method
dbConnect.once("open", () => {
  console.log("Dabatase connection successful");
});

const app = express();
routes(app);

export default app;
