import express from "express";
import dotenv from "dotenv";
import "colors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import webMessageRoutes from "./routes/webMessageRoutes.js";

//conig env var
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/webmessage", webMessageRoutes);

app.get("/", (req, res) => {
  res.send("<h1> Node Server Running </h1>");
});

//port
const PORT = process.env.PORT || 5000;

//run server
app.listen(PORT, () => {
  console.log(
    `Node Server Ruuning in ${process.env.NODE_ENV} Mode On Port ${PORT}`.bgCyan.white
  );
});