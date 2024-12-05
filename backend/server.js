import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/TodoRoute.js";
import categoryRoutes from "./routes/CategoryRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});