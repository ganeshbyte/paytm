import express from "express";
import { connectToDb } from "./db.js";
import "dotenv/config";
import mainRouter from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

//port for server
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.use("/api/v1", mainRouter);

//test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URL);
    console.log("Connected To Db");

    app.listen(PORT, () => {
      console.log("Server is started at port ", PORT);
    });
  } catch (error) {
    console.log("db not connected");
  }
};

start();
