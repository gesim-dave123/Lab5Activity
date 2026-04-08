import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./_middleware/errorHandler";
import { initialize } from "./_helpers/db";
import userController from "./controllers/users.controller";
import authController from "./controllers/auth.controller";
import requestController from "./controllers/request.controller";
import departmentController from "./controllers/departments.controller";
import employeeController from "./controllers/employee.controller";
import contentController from "./controllers/content.controller";
import dashboardController from "./controllers/dashboard.controller";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/users", userController);
app.use("/api/auth", authController);
app.use("/api/requests", requestController);
app.use("/api/departments", departmentController);
app.use("/api/employees", employeeController);
app.use("/api/content", contentController);
app.use("/api/dashboard", dashboardController);
app.use(errorHandler);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello, World!" });
});

initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
