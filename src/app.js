import express from "express";
import connectDatabase from "./Context/DbConnect.js";
import routes from "./routes/index.js";
import ErrorRequestHandler from "./Middleware/ErrorHandler.js";

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
app.use(ErrorRequestHandler);

export default app;
