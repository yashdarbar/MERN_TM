import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    status: "pending" | "completed";
    priority: "low" | "medium" | "high";
    dueDate?: Date;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        dueDate: {
            type: Date,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);

// import mongoose, { Schema } from "mongoose";
// import { ITask, TaskStatus } from "../types/user.types";

// const taskSchema = new Schema<ITask>(
//     {
//         title: {
//             type: String,
//             required: [true, "Task title is required"],
//             trim: true,
//         },
//         content: {
//             type: String,
//             required: [true, "Task content is required"],
//             trim: true,
//         },
//         deadline: {
//             type: Date,
//             required: [true, "Deadline is required"],
//         },
//         status: {
//             type: String,
//             enum: Object.values(TaskStatus),
//             default: TaskStatus.TODO,
//         },
//         assignedTo: {
//             type: Schema.Types.ObjectId,
//             ref: "User",
//             required: [true, "Task must be assigned to a user"],
//         },
//     },
//     {
//         timestamps: true, // This will automatically add createdAt and updatedAt fields
//     }
// );
