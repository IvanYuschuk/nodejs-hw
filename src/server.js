import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRouter from "./routes/notesRoutes.js";


const port = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

app.use(notesRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => {
  console.log(`server is running on ${port}!`);
});

