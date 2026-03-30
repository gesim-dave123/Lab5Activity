import express, { Application} from "express";
import cors from "cors";
import {errorHandler} from "./_middleware/errorHandler";
import {initialize} from "./_helpers/db";
import userController from "./users/users.controller";
import dotenv from "dotenv";

dotenv.config();


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/users", userController);

app.use(errorHandler);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello, World!" });
});

initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      console.log(`Test with : POST /users, {email,password, ......}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
    