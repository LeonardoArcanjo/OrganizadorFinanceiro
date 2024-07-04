import express from "express";
import { OK_STATUS } from "./Models/Constants.js";

const app = express();

app.get("/", (req, res) => {
  res.status(OK_STATUS).send("Express API working...");
});

// mongodb+srv://MLSoftwareAdmin:<password>@mycluster.g57a8jt.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster

export default app;
