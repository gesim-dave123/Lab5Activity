import express, { type ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [`http://127.0.0.1:5500`, `http://localhost:5500`],
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello, World!" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
