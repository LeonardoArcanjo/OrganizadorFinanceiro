import "dotenv/config";
import app from "./src/app.js";
import { PORT } from "./src/Models/Constants.js";

app.listen(PORT, () => {
  console.log("Server is Working...");
});
