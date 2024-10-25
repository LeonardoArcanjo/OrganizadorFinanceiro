import express from "express";
import connectDatabase from "./Context/DbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import { BAD_REQUEST_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "./Models/Constants.js";

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
app.use(express.json());
routes(app);

//Error Middleware creation
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(BAD_REQUEST_STATUS).send({ message: "Data request error" })
  }
  else {
    res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: "Internal server error" })
  }
})

export default app;
