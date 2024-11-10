import express, { RequestHandler } from "express";
import { Task } from "../models/task.model";
import mongoose from "mongoose";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware";

const router = express.Router();

interface CreateTaskRequest {
    title: string;
    description: string;
    priority?: "low" | "medium" | "high";
    dueDate?: Date;
}

interface UpdateTaskRequest {
    title?: string;
    description?: string;
    status?: "pending" | "completed";
    priority?: "low" | "medium" | "high";
    dueDate?: Date;
}

const createTaskHandler: RequestHandler = async (
    req: AuthRequest,
    res
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        console.log("Creating task for user:", userId);

        const taskData = req.body as CreateTaskRequest;

        const newTask = new Task({
            ...taskData,
            userId: new mongoose.Types.ObjectId(userId),
        });

        await newTask.save();

        res.status(201).json({
            message: "Task created successfully",
            success: true,
            task: newTask,
        });
    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({
            message: "Error creating task",
            success: false,
        });
    }
};

const updateTaskHandler: RequestHandler = async (
    req: AuthRequest,
    res
): Promise<void> => {
    try {
        const { taskId } = req.params;
        const userId = req.user?.userId;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            res.status(400).json({
                message: "Invalid task ID",
                success: false,
            });
            return;
        }

        const updates = req.body as UpdateTaskRequest;

        const task = await Task.findOne({
            _id: taskId,
            userId: userId,
        });

        if (!task) {
            res.status(404).json({
                message: "Task not found or unauthorized",
                success: false,
            });
            return;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        res.json({
            message: "Task updated successfully",
            success: true,
            task: updatedTask,
        });
    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({
            message: "Error updating task",
            success: false,
        });
    }
};

// Apply authentication middleware to all routes
//router.use(authenticateToken);

// Protected routes
router.post("/tasks", createTaskHandler);
router.put("/:taskId", updateTaskHandler);

export default router;

// import express, { RequestHandler, Router, Request } from "express";
// import { Task } from "../models/task.model";
// import mongoose from "mongoose";
// import { IUser } from "../types/user.types";
// import { ITask, TaskStatus } from "../types/task.types";

// // Define custom interface extending Express Request
// interface AuthRequest extends Request {
//     user?: {
//         userId: string;
//         // Add other user properties that your auth middleware attaches
//     };
// }

// const router: Router = express.Router();

// interface CreateTaskRequest {
//     title: string;
//     description: string;
//     priority?: "low" | "medium" | "high";
//     dueDate?: Date;
// }

// interface UpdateTaskRequest {
//     title?: string;
//     description?: string;
//     status?: "pending" | "completed";
//     priority?: "low" | "medium" | "high";
//     dueDate?: Date;
// }

// // Update handler signatures to use AuthRequest
// const createTaskHandler: RequestHandler = async (
//     req: AuthRequest,
//     res
// ): Promise<void> => {
//     try {
//         const userId = req.user?.userId;

//         if (!userId) {
//             res.status(401).json({
//                 message: "Authentication required",
//                 success: false,
//             });
//             return;
//         }

//         console.log("userid", userId);

//         const taskData = req.body as CreateTaskRequest;

//         const newTask = new Task({
//             ...taskData,
//             userId: new mongoose.Types.ObjectId(userId),
//         });

//         await newTask.save();

//         res.status(201).json({
//             message: "Task created successfully",
//             success: true,
//             task: newTask,
//         });
//     } catch (error) {
//         console.error("Create task error:", error);
//         res.status(500).json({
//             message: "Error creating task",
//             success: false,
//         });
//     }
// };

// const updateTaskHandler: RequestHandler = async (
//     req: AuthRequest,
//     res
// ): Promise<void> => {
//     try {
//         const { taskId } = req.params;
//         const userId = req.user?.userId;

//         if (!userId) {
//             res.status(401).json({
//                 message: "Authentication required",
//                 success: false,
//             });
//             return;
//         }

//         if (!mongoose.Types.ObjectId.isValid(taskId)) {
//             res.status(400).json({
//                 message: "Invalid task ID",
//                 success: false,
//             });
//             return;
//         }

//         const updates = req.body as UpdateTaskRequest;

//         const task = await Task.findOne({
//             _id: taskId,
//             userId: userId,
//         });

//         if (!task) {
//             res.status(404).json({
//                 message: "Task not found or unauthorized",
//                 success: false,
//             });
//             return;
//         }

//         const updatedTask = await Task.findByIdAndUpdate(
//             taskId,
//             { $set: updates },
//             { new: true, runValidators: true }
//         );

//         res.json({
//             message: "Task updated successfully",
//             success: true,
//             task: updatedTask,
//         });
//     } catch (error) {
//         console.error("Update task error:", error);
//         res.status(500).json({
//             message: "Error updating task",
//             success: false,
//         });
//     }
// };

// router.post("/tasks", createTaskHandler);
// router.put("/tasks/:taskId", updateTaskHandler);

// export default router;

// import express, { RequestHandler, Router } from "express";
// import { Task } from "../models/task.model";
// import mongoose from "mongoose";
// import { IUser } from "../types/user.types";
// import { ITask, TaskStatus } from "../types/task.types";

// const router : Router = express.Router();

// interface CreateTaskRequest {
//     title: string;
//     description: string;
//     priority?: "low" | "medium" | "high";
//     dueDate?: Date;
// }

// interface UpdateTaskRequest {
//     title?: string;
//     description?: string;
//     status?: "pending" | "completed";
//     priority?: "low" | "medium" | "high";
//     dueDate?: Date;
// }

// // Add new task
// const createTaskHandler: RequestHandler = async (req, res): Promise<void> => {
//     try {
//         // Get the user ID from the authenticated request
//         const userId = req.user?.userId; // Assuming you have authentication middleware that adds user info

//         if (!userId) {
//             res.status(401).json({
//                 message: "Authentication required",
//                 success: false,
//             });
//             return;
//         }

//         const taskData = req.body as CreateTaskRequest;

//         const newTask = new Task({
//             ...taskData,
//             userId: new mongoose.Types.ObjectId(userId),
//         });

//         await newTask.save();

//         res.status(201).json({
//             message: "Task created successfully",
//             success: true,
//             task: newTask,
//         });
//     } catch (error) {
//         console.error("Create task error:", error);
//         res.status(500).json({
//             message: "Error creating task",
//             success: false,
//         });
//     }
// };

// // Edit existing task
// const updateTaskHandler: RequestHandler = async (req, res): Promise<void> => {
//     try {
//         const { taskId } = req.params;
//         const userId = req.user?.userId; // Assuming you have authentication middleware

//         if (!userId) {
//             res.status(401).json({
//                 message: "Authentication required",
//                 success: false,
//             });
//             return;
//         }

//         // Validate if taskId is a valid MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(taskId)) {
//             res.status(400).json({
//                 message: "Invalid task ID",
//                 success: false,
//             });
//             return;
//         }

//         const updates = req.body as UpdateTaskRequest;

//         // Find task and ensure it belongs to the authenticated user
//         const task = await Task.findOne({
//             _id: taskId,
//             userId: userId,
//         });

//         if (!task) {
//             res.status(404).json({
//                 message: "Task not found or unauthorized",
//                 success: false,
//             });
//             return;
//         }

//         // Update the task
//         const updatedTask = await Task.findByIdAndUpdate(
//             taskId,
//             { $set: updates },
//             { new: true, runValidators: true }
//         );

//         res.json({
//             message: "Task updated successfully",
//             success: true,
//             task: updatedTask,
//         });
//     } catch (error) {
//         console.error("Update task error:", error);
//         res.status(500).json({
//             message: "Error updating task",
//             success: false,
//         });
//     }
// };

// // Register routes
// router.post("/tasks", createTaskHandler);
// router.put("/tasks/:taskId", updateTaskHandler);

// export default router;
