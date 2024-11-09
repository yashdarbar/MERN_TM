export interface IUser {
    _id?: string;
    name: string;
    email: string;
    createdAt?: Date;
}

export enum TaskStatus {
    TODO = "to-do",
    IN_PROGRESS = "in-progress",
    DONE = "done",
}

export interface ITask {
    _id?: string;
    title: string;
    content: string;
    deadline: Date;
    status: TaskStatus;
    assignedTo: string | undefined; // This will store the User's _id
    createdAt?: Date;
    updatedAt?: Date;
}