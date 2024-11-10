import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/cors";
import { connectDB } from "./config/db.config";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
    res.send("Welcome to the Task Manager API");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);
//app.use("/api/tasks/:taskId", taskRoutes);

app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error("Global error handler:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth";
// import { connectDB } from "./config/db.config";

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to database
// connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.get("/", (req: Request, res: Response) => {
//     res.send("Welcome to the Task Manager API");
// });

// // Auth routes
// app.use("/api/auth", authRoutes);

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// export default app;
