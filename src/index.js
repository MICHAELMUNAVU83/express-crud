import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandling.js";

import createUserTable from "./data/createUserTable.js";
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);

// Error Handling Middleware

app.use(errorHandling);

// Create table on startup

createUserTable();
// Test DB connection on startup
pool
  .query("SELECT 1")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.get("/test-db", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send("The database name is: " + result.rows[0].current_database);
  } catch (err) {
    next(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
