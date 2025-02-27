import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRouter);

//Middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Blogging Website API!");
});

app.listen(PORT, async () => {
  console.log(`Blogging Website API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
