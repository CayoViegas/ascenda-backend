import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

export default app;
