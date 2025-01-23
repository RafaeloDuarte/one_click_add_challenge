import express from "express";
import bodyParser from "body-parser";

const cors = require('cors');

import userRoutes from "./routes/userRoutes";
import videoRoutes from "./routes/videoRoutes";
import statusRoute from "./routes/statusRoute";

import { sequelize } from "./database";
import i18n from "./middleware/i18n";
import dotenv from "dotenv";
dotenv.config();

export const app = express();
const clientUrl = process.env.CLIENT_URL

app.use(cors());
app.use(i18n);

app.use(
  cors({
    origin: clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(bodyParser.json());

// Database Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("Database synchronized.");
    require("./seeders/seeder");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Routes
app.use("/", statusRoute);
app.use("/users", userRoutes);
app.use("/videos", videoRoutes);